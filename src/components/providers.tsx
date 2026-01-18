"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import type { ReactNode } from "react";
import { SuiWalletProvider } from "~/contexts/SuiWalletContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SuiWalletProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SuiWalletProvider>
  );
}
