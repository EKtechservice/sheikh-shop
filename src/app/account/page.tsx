import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import AccountView from "@/components/AccountView";
import Newsletter from "@/components/Newsletter";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "My Account & Orders | Sheikh Trading Enterprise",
  description:
    "Manage your delivery profile, preferred menswear sizes, and WhatsApp ordering with Sheikh Trading Enterprise.",
};

export default function AccountPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <AnnouncementBar />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-zinc-100 bg-zinc-50/70 py-3">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-text-muted"
            >
              <Link href="/" className="hover:text-navy transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <span className="font-semibold text-navy">Customer Account</span>
            </nav>
          </div>
        </div>

        {/* Account View Client Component */}
        <AccountView />

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
