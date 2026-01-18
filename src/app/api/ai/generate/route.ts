import { NextResponse } from "next/server";
import { generateImage } from "@/lib/ai/gemini";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt required" }, { status: 400 });
  }

  const imageBase64 = await generateImage(prompt);

  return NextResponse.json({
    imageBase64,
  });
}
