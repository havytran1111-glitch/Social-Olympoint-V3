"use client";

import { useCurrentAccount, useSignPersonalMessage } from "@mysten/dapp-kit";
import { uploadToWalrus } from "~/actions/walrus-upload";
import { Button } from "@/components/ui/button";

export default function SignAndUpload({ file }: { file: File }) {
  const account = useCurrentAccount();
  const { mutateAsync: signMessage } = useSignPersonalMessage();

  const handleUpload = async () => {
    if (!account) {
      alert("Connect Slush wallet first");
      return;
    }

    // 1. Message để ký
    const message = new TextEncoder().encode(
      `Upload image to Walrus\nAddress: ${account.address}`
    );

    // 2. Ký bằng ví
    const signatureResult = await signMessage({
      message,
      account,
    });

    // 3. Gửi lên server
    const res = await uploadToWalrus({
      file,
    });

    console.log("Walrus result:", res);
  };

  return (
    <Button onClick={handleUpload}>
      Upload to Walrus (via Slush)
    </Button>
  );
}
