"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for diagnostics
    console.error("Client Error Caught by App Error Boundary:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col items-center justify-center bg-[#0A0A0A] px-4 py-12 text-white pt-safe pb-safe">
      <div className="mx-auto max-w-md text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1B2A4A] text-[#B98B63] border border-[#B98B63]/30 shadow-lg">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B98B63]">
            Sheikh&apos;s Shop Menswear
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            Something Went Wrong
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We encountered a temporary issue while loading this page on your device. Please try refreshing or return to the storefront.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#1B2A4A] hover:bg-[#141F38] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all active:scale-95 cursor-pointer"
          >
            <Home className="h-4 w-4" />
            <span>Return to Store</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
