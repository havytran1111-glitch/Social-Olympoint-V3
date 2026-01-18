"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CustomerPortalRedirect() {
  const router = useRouter();

  useEffect(() => {
    // TODO: Implement customer portal integration with Polar SDK
    // For now, show coming soon message
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <p className="text-muted-foreground text-sm">
          Loading your customer portal...
        </p>
      </div>
    </div>
  );
}