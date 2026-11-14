import React from "react";
import Link from "next/link";
import { ShieldCheck, LogOut, Store, ExternalLink } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

interface AdminNavbarProps {
  ownerEmail?: string;
}

export default function AdminNavbar({ ownerEmail }: AdminNavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-md text-white pt-safe pl-safe pr-safe">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1B2A4A] text-[#B98B63] shrink-0 border border-[#B98B63]/30">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold uppercase tracking-wider text-white">
                Sheikh&apos;s Shop
              </span>
              <span className="rounded-full bg-[#1B2A4A] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#B98B63] border border-[#B98B63]/30">
                Owner Portal
              </span>
            </div>
            {ownerEmail && (
              <span className="text-[11px] text-zinc-400 hidden sm:inline">
                {ownerEmail}
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-zinc-200 hover:text-white transition-colors cursor-pointer"
          >
            <Store className="h-4 w-4 text-[#B98B63]" />
            <span className="hidden sm:inline">View Public Store</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-950/40 hover:bg-red-950/70 px-3.5 py-2 text-xs font-semibold text-red-200 hover:text-white transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
