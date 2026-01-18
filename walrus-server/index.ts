import express from "express";
import bodyParser from "body-parser";
import { WalrusClient } from "@mysten/walrus";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { fromB64 } from "@mysten/sui/utils";

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") });
const walrus = new WalrusClient({ suiClient, network: "testnet" });

const keypair = Ed25519Keypair.fromSecretKey(
  fromB64(process.env.SUI_PRIVATE_KEY!)
);

app.post("/upload", async (req, res) => {
  try {
    const { base64, filename } = req.body;

    const buffer = Buffer.from(base64, "base64");

    const result = await walrus.writeFiles({
      files: [
        {
          contents: buffer,
          identifier: filename,
        },
      ],
      signer: keypair,
      epochs: 10,
      deletable: false,
    });

    res.json({
      blobId: result[0].blobObject.blob_id,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Walrus upload failed" });
  }
});

app.listen(4000, () => {
  console.log("🚀 Walrus server running on port 4000");
});
