import { NextRequest, NextResponse } from "next/server";
import { readdir, unlink } from "fs/promises";
import { join } from "path";

const outputDir = join(process.cwd(), "tools", "piper", "outputs");

export async function GET() {
  try {
    const files = await readdir(outputDir);
    const wavFiles = files.filter((f) => f.endsWith(".wav"));
    return NextResponse.json({ files: wavFiles });
  } catch (err) {
    console.error("[GET ERROR]", err);
    return NextResponse.json(
      { error: "Failed to list files" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json({ error: "Missing filename" }, { status: 400 });
    }

    const filePath = join(outputDir, name);
    await unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE ERROR]", err);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
