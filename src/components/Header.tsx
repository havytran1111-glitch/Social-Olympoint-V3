"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import ConnectWallet from "@/components/wallet/ConnectWallet";

export default function Header() {
  const { user, signOutUser } = useAuth();

  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      {/* LEFT */}
      <Link href="/" className="text-lg font-bold">
        OlymPoint
      </Link>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* SLUSH WALLET */}
        <ConnectWallet />

        {/* AUTH */}
        {user ? (
          <button
            onClick={signOutUser}
            className="text-sm font-medium text-red-600 hover:underline"
          >
            Sign out
          </button>
        ) : (
          <Link
            href="/auth/sign-in"
            className="text-sm font-medium hover:underline"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
