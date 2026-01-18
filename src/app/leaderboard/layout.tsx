import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-slate-50/95 backdrop-blur supports-backdrop-filter:bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-blue-500 to-purple-600 shadow-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                  OlymPoint Social App
                </span>
              </Link>
            </div>
            <div className="hidden items-center gap-4 sm:flex">
              <Link
                href="/#features"
                className="text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                Features
              </Link>
              <Link
                href="/leaderboard"
                className="text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                Leaderboard
              </Link>
              <Link
                href="/#pricing"
                className="text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                Pricing
              </Link>
              <Link
                href="/voteme"
                className="text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                VoteMe
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      <main>{children}</main>

      <footer className="bg-slate-100/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <div className="flex items-center justify-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-blue-500 to-purple-600 shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                OlymPoint Social App
              </span>
            </div>
            <p className="mt-4 text-center text-sm text-slate-600">
              © {new Date().getFullYear()} OlymPoint. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
