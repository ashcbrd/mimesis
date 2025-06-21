import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { createReadStream, existsSync } from "fs";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const path = url.searchParams.get("path");

  if (!path) {
    return new NextResponse("Missing path", { status: 400 });
  }

  const filePath = join(process.cwd(), "tools", "piper", "outputs", path);

  if (!existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  const fileStream = createReadStream(filePath);

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of fileStream) {
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });

  return new NextResponse(readable, {
    headers: {
      "Content-Type": "audio/wav",
      "Cache-Control": "no-cache",
    },
  });
}
