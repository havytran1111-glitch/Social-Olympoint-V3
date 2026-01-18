"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUpPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);



  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsSubmitting(false);
      return;
    }


    setError("Email signup not implemented. Please use Google.");
    setIsSubmitting(false);
  };

  // ✅ GOOGLE LOGIN – CHÍNH
  const handleGoogleSignUp = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      await signInWithGoogle();

      router.replace("/profile"); // hoặc "/dashboard"
    } catch (err) {
      console.error(err);
      setError("Failed to sign up with Google. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-md mx-auto">
        <div className="overflow-hidden rounded-3xl bg-white p-10 shadow">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">OLYMPOINT</h1>
            <p className="text-gray-600 mt-2">Create Your Account</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
            <input
              type="password"
              placeholder="Password"
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />

            <Button disabled className="w-full">
              Sign Up (Disabled)
            </Button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            onClick={handleGoogleSignUp}
            disabled={isSubmitting}
            className="w-full bg-white text-gray-900 border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <span className="font-bold text-lg">G</span>
            {isSubmitting ? "Signing in..." : "Sign up with Google"}
          </Button>

          <p className="text-gray-600 text-center text-sm mt-6">
            Already have an account?{" "}
            <a
              href="/auth/sign-in"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
