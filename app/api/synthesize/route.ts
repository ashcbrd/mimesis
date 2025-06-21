import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { spawn } from "child_process";
import { readdir, rename } from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const modelPath = formData.get("model") as string;
    const text = formData.get("text") as string | null;
    const file = formData.get("file") as File | null;

    if (!modelPath) {
      return NextResponse.json({ error: "No model selected" }, { status: 400 });
    }

    const outputDir = join(process.cwd(), "tools", "piper", "outputs");

    let inputText = "";
    if (text) {
      inputText = text;
    } else if (file) {
      const arrayBuffer = await file.arrayBuffer();
      inputText = Buffer.from(arrayBuffer).toString("utf-8");
    } else {
      return NextResponse.json({ error: "No input provided" }, { status: 400 });
    }

    const cleaned = inputText.replace(/[\r\n]+/g, " ").trim();

    const before = await readdir(outputDir);

    await new Promise<void>((resolve, reject) => {
      const piperCmd = process.platform === "win32" ? "piper.exe" : "./piper";
      const piper = spawn(
        piperCmd,
        ["-m", `./voices/en_US/${modelPath}`, "-d", outputDir],
        {
          cwd: join(process.cwd(), "tools", "piper"),
          shell: true,
        }
      );

      piper.stdin.write(cleaned);
      piper.stdin.end();

      piper.stderr.on("data", (data) =>
        console.error("[PIPER ERROR]", data.toString())
      );
      piper.on("exit", (code) => {
        if (code === 0) resolve();
        else reject(new Error("Piper exited with code " + code));
      });
    });

    const after = await readdir(outputDir);
    const newFiles = after.filter(
      (f) => !before.includes(f) && f.endsWith(".wav")
    );

    if (newFiles.length === 0) {
      return NextResponse.json(
        { error: "No audio generated" },
        { status: 500 }
      );
    }

    const base =
      modelPath
        .split("/")
        .pop()
        ?.replace(/\.[^.]+$/, "") ?? "voice";
    const safeBase = base.replace(/[\/\\]/g, "-");
    const existing = after.filter(
      (f) => f.startsWith(safeBase) && f.endsWith(".wav")
    );
    const nextIndex = existing.length + 1;
    const finalName = `${safeBase}${nextIndex}.wav`;

    await rename(join(outputDir, newFiles[0]), join(outputDir, finalName));

    return NextResponse.json({ audioPath: finalName });
  } catch (err) {
    console.error("[SYNTH ERROR]", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
