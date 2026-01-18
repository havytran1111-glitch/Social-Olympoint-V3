import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY!
);

export async function generateImage(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        mimeType: "image/png",
        data: "",
      },
    },
  ]);

  const image = result.response.candidates?.[0]?.content?.parts?.find(
    (p: any) => p.inlineData
  );

  if (!image?.inlineData?.data) {
    throw new Error("No image generated");
  }

  return image.inlineData.data; // base64
}
