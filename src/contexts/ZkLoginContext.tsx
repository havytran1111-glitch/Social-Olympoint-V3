"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ZkLoginContextType {
  address: string | null;
}

const ZkLoginContext = createContext<ZkLoginContextType | null>(null);

export function ZkLoginProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("zklogin");
    if (stored) {
      setAddress(JSON.parse(stored).address);
    }
  }, []);

  return (
    <ZkLoginContext.Provider value={{ address }}>
      {children}
    </ZkLoginContext.Provider>
  );
}

export function useZkLogin() {
  const ctx = useContext(ZkLoginContext);
  if (!ctx) {
    throw new Error("useZkLogin must be used within ZkLoginProvider");
  }
  return ctx;
}
