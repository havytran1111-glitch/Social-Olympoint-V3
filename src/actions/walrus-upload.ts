"use server";

import { WalrusClient, WalrusFile } from "@mysten/walrus";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { fromB64 } from "@mysten/sui/utils";
import path from "path";
import fs from "fs/promises";

import { env } from "~/env";

/* ================= TYPES ================= */

interface UploadInput {
  file: File;
}

/* ================= CLIENT SETUP ================= */

const suiClient = new SuiClient({
  url: getFullnodeUrl("testnet"),
});

const walrusClient = new WalrusClient({
  suiClient,
  network: "testnet",
});

/* ================= ACTION ================= */

export async function uploadToWalrus(input: UploadInput) {
  const { file } = input;

  if (!env.SUI_PRIVATE_KEY) {
    throw new Error("❌ SUI_PRIVATE_KEY is missing");
  }

  /* ---------- signer (APP signer, NOT user) ---------- */
  const keypair = Ed25519Keypair.fromSecretKey(
    fromB64(env.SUI_PRIVATE_KEY),
  );

  /* ---------- read file ---------- */
  const buffer = Buffer.from(await file.arrayBuffer());

  const walrusFile = WalrusFile.from({
    contents: buffer,
    identifier: `upload-${Date.now()}-${file.name}`,
    tags: {
      "content-type": file.type || "application/octet-stream",
      "uploaded-at": new Date().toISOString(),
    },
  });

  /* ---------- upload ---------- */
  console.log("📤 Uploading to Walrus...");

  const result = await walrusClient.writeFiles({
    files: [walrusFile],
    epochs: 10,
    signer: keypair,
    deletable: false,
  });

  if (!result?.[0]?.blobObject?.blob_id) {
    throw new Error("❌ Walrus upload failed");
  }

  const blobId = result[0].blobObject.blob_id;

  const url = `https://aggregator.walrus-testnet.walrus.space/v1/${blobId}`;

  console.log("✅ Uploaded:", blobId);

  return {
    success: true,
    blobId,
    url,
  };
}
