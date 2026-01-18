"use server";

import { z } from "zod";

/* ================= SCHEMA ================= */

const generateImageSchema = z.object({
  prompt: z.string().min(3, "Prompt must be at least 3 characters long"),
});

/* ================= TYPES ================= */

interface GenerateImageState {
  error?: string;
  imageUrl?: string;
  blobId?: string;
}

/* ================= ACTION ================= */

export async function generateImage(
  prevState: GenerateImageState,
  formData: FormData,
): Promise<GenerateImageState> {
  const validatedFields = generateImageSchema.safeParse({
    prompt: formData.get("prompt"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.prompt?.[0],
    };
  }

  const { prompt } = validatedFields.data;

  try {
    /* ================= 1. GENERATE IMAGE (SVG PLACEHOLDER) ================= */

    const svgImage = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#667eea" />
          <stop offset="100%" stop-color="#764ba2" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <text x="50%" y="45%" fill="white" font-size="32" font-weight="bold"
        text-anchor="middle" dominant-baseline="middle">
        OLYMPOINT
      </text>
      <text x="50%" y="60%" fill="white" font-size="18"
        text-anchor="middle" dominant-baseline="middle" opacity="0.85">
        ${prompt}
      </text>
    </svg>`;

    const base64Image = Buffer.from(svgImage).toString("base64");

    /* ================= 2. CALL WALRUS BACKEND ================= */

    const res = await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        base64: base64Image,
        filename: `ai-${Date.now()}.svg`,
        contentType: "image/svg+xml",
      }),
    });

    if (!res.ok) {
      throw new Error("Walrus upload failed");
    }

    const data = await res.json();

    if (!data?.blobId) {
      throw new Error("No blobId returned from Walrus server");
    }

    /* ================= 3. RETURN RESULT ================= */

    return {
      blobId: data.blobId,
      imageUrl: `https://aggregator.walrus-testnet.walrus.space/v1/${data.blobId}`,
    };
  } catch (error) {
    console.error("Generate image error:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "An unknown error occurred",
    };
  }
}
