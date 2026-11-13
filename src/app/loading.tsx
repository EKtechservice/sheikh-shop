import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center bg-white px-4">
      {/* Decorative Brand Spinner */}
      <div className="relative flex h-14 w-14 items-center justify-center">
        <div className="h-12 w-12 rounded-full border-2 border-zinc-200 border-t-navy animate-spin" />
        <span className="font-logo text-lg font-semibold text-navy">S</span>
      </div>
      <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
        Loading Sheikh&apos;s Shop...
      </p>
    </div>
  );
}
