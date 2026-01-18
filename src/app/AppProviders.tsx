"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "@/contexts/AuthContext";
import { ZkLoginProvider } from "@/contexts/ZkLoginContext";

import {
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";

export default function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ZkLoginProvider>
          <SuiClientProvider
            networks={{
              testnet: {
                url: "https://fullnode.testnet.sui.io",
              },
            }}
            defaultNetwork="testnet"
          >
            <WalletProvider autoConnect>
              {children}
            </WalletProvider>
          </SuiClientProvider>
        </ZkLoginProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
