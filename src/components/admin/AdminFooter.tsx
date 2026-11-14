import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

interface AdminFooterProps {
  ownerEmail?: string;
}

export default function AdminFooter({ ownerEmail }: AdminFooterProps) {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0A0A0A] py-8 text-zinc-400 text-xs pb-safe pl-safe pr-safe">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#B98B63]" />
          <span className="font-semibold text-white">Sheikh&apos;s Shop Owner Portal</span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <span className="hidden sm:inline">Protected by Supabase Auth</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          {ownerEmail && (
            <span className="text-zinc-500">
              Session: <span className="text-zinc-300 font-medium">{ownerEmail}</span>
            </span>
          )}
          <Link
            href="/"
            className="text-zinc-400 hover:text-white transition-colors underline underline-offset-2"
          >
            Storefront
          </Link>
          <span className="text-zinc-600">|</span>
          <span>&copy; {new Date().getFullYear()} Sheikh&apos;s Shop</span>
        </div>
      </div>
    </footer>
  );
}
