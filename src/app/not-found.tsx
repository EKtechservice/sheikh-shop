import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-white px-4 py-16 text-center">
      <span className="font-logo text-7xl font-semibold text-navy">404</span>
      <h1 className="mt-4 font-sans text-2xl font-bold uppercase tracking-wide text-brand-black sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted">
        The menswear collection or page you are looking for does not exist or
        has been moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-navy px-8 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-dark hover:shadow-md focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus:outline-none"
        >
          Return to Homepage
        </Link>
        <Link
          href="/categories"
          className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-8 py-3 text-xs font-bold uppercase tracking-wide text-brand-black transition-colors duration-200 hover:border-navy hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus:outline-none"
        >
          Browse Categories
        </Link>
      </div>
    </main>
  );
}
