"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GoogleButton() {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      router.replace("/profile"); 
    } catch (err) {
      console.error(err);
      alert("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="w-full bg-white text-gray-900 border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
    >
      <span className="font-bold text-lg">G</span>
      {loading ? "Signing in..." : "Continue with Google"}
    </Button>
  );
}
