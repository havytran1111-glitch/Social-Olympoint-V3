"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function SignInPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");



  const handleSignIn = async () => {
    setError("");
    try {
      await signInWithGoogle();
      // redirect sẽ chạy trong useEffect
    } catch (err) {
      console.error(err);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white p-8 shadow">
      <h2 className="mb-2 text-2xl font-bold">Sign in</h2>
      <p className="mb-6 text-slate-500">
        Welcome back to OlymPoint
      </p>

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-100 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Email/password – CHƯA DÙNG */}
      <input
        disabled
        className="mb-3 w-full rounded border px-4 py-2 bg-slate-100"
        placeholder="Email"
      />
      <input
        disabled
        type="password"
        className="mb-4 w-full rounded border px-4 py-2 bg-slate-100"
        placeholder="Password"
      />

      {/* GOOGLE SIGN IN */}
      <button
        onClick={handleSignIn}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded bg-blue-600 py-2 text-white hover:bg-blue-700 transition"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.461 2.268 15.365 1.25 12.545 1.25 6.529 1.25 1.636 6.143 1.636 12.159c0 6.016 4.893 10.909 10.909 10.909 10.927 0 11.854-10.165 11.854-10.909 0-.531 0-1.042-.052-1.52H12.545z" />
        </svg>
        Sign in with Google
      </button>

      <p className="text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="text-blue-600">
          Sign up
        </Link>
      </p>
    </div>
  );
}
