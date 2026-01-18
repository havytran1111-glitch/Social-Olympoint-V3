import { NextResponse } from "next/server";

export async function POST() {
  
  const fakeBlobId = `0x${crypto.randomUUID().replace(/-/g, "")}`;

  return NextResponse.json({
    blobId: fakeBlobId,
    url: `https://walrus-testnet.walrus.space/blob/${fakeBlobId}`,
    mocked: true,
  });
}
