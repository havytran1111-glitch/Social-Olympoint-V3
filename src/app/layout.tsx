import type { ReactNode } from "react";
import "@/styles/globals.css";
import ClientProviders from "./ClientProviders";

export const metadata = {
  title: "OlymPoint",
  description: "AI-powered Social Platform on Sui",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
