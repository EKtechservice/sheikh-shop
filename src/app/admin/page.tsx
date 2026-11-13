import React from "react";
import type { Metadata } from "next";
import { requireOwner } from "@/lib/auth";
import { logoutAction } from "./actions";
import { getAdminProducts } from "./product-actions";
import AdminDashboardClient from "./AdminDashboardClient";
import Link from "next/link";
import { ShieldCheck, LogOut, Store, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Owner Admin Dashboard | Sheikh's Shop",
  description: "Private inventory & price management dashboard.",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const owner = await requireOwner();
  const { products } = await getAdminProducts();

  return (
    <div className="min-h-[100dvh] bg-[#0A0A0A] text-white flex flex-col">
      {/* Top Header Bar */}
      <header className="border-b border-white/10 bg-[#0D1016] sticky top-0 z-30 pt-safe">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-[#1B2A4A] text-[#B98B63] shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="text-sm font-extrabold uppercase tracking-wider text-white">
                Sheikh&apos;s Shop
              </span>
              <span className="hidden sm:inline-block ml-2 rounded-full bg-[#1B2A4A] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#B98B63]">
                Owner Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="flex min-h-[44px] items-center gap-1.5 px-2.5 py-1 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">Public Store</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 pb-safe">
        {/* Welcome Banner */}
        <div className="rounded-2xl border border-white/10 bg-[#0D1016] p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#B98B63]">
              Store Administration
            </span>
            <h1 className="mt-1 text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white">
              Product &amp; Price Manager
            </h1>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              Logged in as <strong className="text-white">{owner.email}</strong>. Changes saved here update your public shop instantly.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-xs font-bold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Sync Active</span>
          </div>
        </div>

        {/* Client Product Management Dashboard */}
        <AdminDashboardClient
          initialProducts={products}
          ownerEmail={owner.email}
        />
      </main>
    </div>
  );
}
