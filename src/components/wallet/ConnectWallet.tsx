"use client";

import { Button } from "@/components/ui/button";
import {
  useCurrentAccount,
  useWallets,
  useConnectWallet,
  useDisconnectWallet,
} from "@mysten/dapp-kit";

export default function ConnectWallet() {
  const account = useCurrentAccount();
  const wallets = useWallets();
  const { mutate: connect, isPending } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();

  /* ================= CONNECTED ================= */

  if (account) {
    return (
      <Button
        variant="outline"
        onClick={() => disconnect()}
        className="font-mono"
      >
        {account.address.slice(0, 6)}...
        {account.address.slice(-4)}
      </Button>
    );
  }

  /* ================= FIND SLUSH WALLET ================= */

  const slushWallet = wallets.find((wallet) => {
    const name = wallet.name?.toLowerCase() ?? "";
    const id = wallet.id?.toLowerCase() ?? "";
    return name.includes("slush") || id.includes("slush");
  });

  /* ================= NOT INSTALLED ================= */

  if (!slushWallet) {
    return (
      <Button
        variant="outline"
        onClick={() =>
          window.open("https://slushwallet.com", "_blank")
        }
      >
        Install Slush Wallet
      </Button>
    );
  }

  /* ================= CONNECT ================= */

  return (
    <Button
      onClick={() => connect({ wallet: slushWallet })}
      disabled={isPending}
    >
      {isPending ? "Connecting..." : "Connect Slush Wallet"}
    </Button>
  );
}
