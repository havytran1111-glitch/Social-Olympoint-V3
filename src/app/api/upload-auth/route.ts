import { getUploadAuthParams } from "@imagekit/next/server";
import { env } from "~/env";

export async function GET() {
  try {
    if (!env.IMAGEKIT_PRIVATE_KEY || !env.IMAGEKIT_PUBLIC_KEY) {
      return Response.json(
        { error: "ImageKit not configured" },
        { status: 503 },
      );
    }

    const { token, expire, signature } = getUploadAuthParams({
      privateKey: env.IMAGEKIT_PRIVATE_KEY,
      publicKey: env.IMAGEKIT_PUBLIC_KEY,
      // expire: 30 * 60, // Optional: 30 minutes expiry (default is 1 hour)
    });

    return Response.json({
      token,
      expire,
      signature,
      publicKey: env.IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
    });
  } catch (error) {
    console.error("Upload auth error:", error);
    return Response.json(
      { error: "Failed to generate upload credentials" },
      { status: 500 },
    );
  }
}
