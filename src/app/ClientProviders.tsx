"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { AuthProvider } from "@/contexts/AuthContext";
import { ZkLoginProvider } from "@/contexts/ZkLoginContext";
import "@mysten/dapp-kit/dist/index.css";

const queryClient = new QueryClient();

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        networks={{
          testnet: { url: "https://fullnode.testnet.sui.io" },
        }}
        defaultNetwork="testnet"
      >
        <WalletProvider autoConnect>
          <AuthProvider>
            <ZkLoginProvider>{children}</ZkLoginProvider>
          </AuthProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
