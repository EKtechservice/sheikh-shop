import React from "react";
import type { Metadata } from "next";
import { getOwnerUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminLoginForm from "./AdminLoginForm";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Login | Sheikh's Shop",
  description: "Secure private portal for Sheikh's Shop administration.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const owner = await getOwnerUser();
  if (owner) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#0A0A0A] px-4 py-8 pt-safe pb-safe relative overflow-hidden">
      {/* Background radial gradient accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1B2A4A]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Return to Public Store link */}
      <div className="mb-6 z-10">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Store</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full flex justify-center z-10">
        <AdminLoginForm />
      </div>
    </div>
  );
}
