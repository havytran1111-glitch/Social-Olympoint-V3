"use client";

import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react';

// You can specify which network to connect to here.
// The options are: 'mainnet', 'testnet', 'devnet', 'localnet'.
const network = "testnet";
const fullnodeUrl = getFullnodeUrl(network);

const queryClient = new QueryClient();

export function SuiWalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={{ [network]: { url: fullnodeUrl } }} defaultNetwork={network}>
        <WalletProvider autoConnect={true}>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
