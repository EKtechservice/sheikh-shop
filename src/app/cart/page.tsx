import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import CartView from "@/components/CartView";
import Newsletter from "@/components/Newsletter";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Shopping Bag | Sheikh's Shop Menswear",
  description:
    "Review your luxury menswear bag, select free pickup or nationwide delivery, and place your order directly via WhatsApp at Sheikh's Shop.",
};

export default function CartPage() {
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
              <span className="font-semibold text-navy">Shopping Bag</span>
            </nav>
          </div>
        </div>

        {/* Cart View Client Component */}
        <CartView />

        {/* Newsletter Section */}
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
