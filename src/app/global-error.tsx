"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen min-h-[100dvh] bg-[#0A0A0A] font-sans text-white antialiased flex flex-col items-center justify-center p-4">
        <div className="mx-auto max-w-md text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1B2A4A] text-[#B98B63] border border-[#B98B63]/30 shadow-lg">
            <AlertTriangle className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B98B63]">
              Sheikh&apos;s Shop
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
              Application Error
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed">
              An unexpected error occurred while loading this view. You can reload the page to continue.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#1B2A4A] hover:bg-[#141F38] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
