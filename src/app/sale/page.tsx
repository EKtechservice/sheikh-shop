import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import CategoryProductGrid from "@/components/CategoryProductGrid";
import CategoryNavPills from "@/components/CategoryNavPills";
import Newsletter from "@/components/Newsletter";
import { getLiveSaleProducts } from "@/lib/products";
import { ChevronRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Seasonal Sale & Offers | Sheikh's Shop Menswear",
  description:
    "Save up to 40% on luxury menswear, Oxford shirts, linen polos, denim, slides, and curated gift boxes at Sheikh's Shop.",
};

export default async function SalePage() {
  const products = await getLiveSaleProducts();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <AnnouncementBar />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-zinc-100 bg-zinc-50/70 py-3">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
              <Link href="/" className="hover:text-navy transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <span className="font-semibold text-navy">Special Sale</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-950 via-navy to-navy-dark py-12 text-white sm:py-16">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sale-red px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
              <Tag className="h-3.5 w-3.5" />
              Limited Time Deals • Up to 40% Off
            </span>
            <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              Special Sale Collection
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-zinc-300">
              Exclusive pricing on selected menswear essentials. Handcrafted quality without compromise. Prices as marked.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <div className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <CategoryNavPills activeSlug="sale" />
          </div>

          <CategoryProductGrid
            products={products}
            categoryTitle="Sale Items"
          />
        </div>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
