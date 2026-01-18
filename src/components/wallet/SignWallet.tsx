"use client";

import { Button } from "@/components/ui/button";
import {
  useCurrentAccount,
  useSignPersonalMessage,
} from "@mysten/dapp-kit";

export default function SignWallet() {
  const account = useCurrentAccount();
  const { mutateAsync: signMessage, isPending } =
    useSignPersonalMessage();

  const handleSign = async () => {
    if (!account) {
      alert("Please connect Slush Wallet first");
      return;
    }

    try {
      const message = new TextEncoder().encode(
        `Verify wallet ownership for OlymPoint: ${account.address}`
      );

      const result = await signMessage({
        message,
      });

      console.log("✅ Wallet Address:", account.address);
      console.log("✅ Signature:", result.signature);
      console.log("✅ Message (bytes):", result.bytes);

      /**
       * TODO:
       * Gửi data này lên server để verify:
       * {
       *   address: account.address,
       *   signature: result.signature,
       *   message
       * }
       */

      alert("Wallet signed successfully!");
    } catch (err) {
      console.error("Sign message failed:", err);
      alert("Failed to sign message");
    }
  };

  return (
    <Button
      onClick={handleSign}
      disabled={!account || isPending}
    >
      {isPending ? "Signing..." : "Sign Wallet Ownership"}
    </Button>
  );
}
