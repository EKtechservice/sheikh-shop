import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import CategoryProductGrid from "@/components/CategoryProductGrid";
import CategoryNavPills from "@/components/CategoryNavPills";
import Newsletter from "@/components/Newsletter";
import { getLivePreorderProducts } from "@/lib/products";
import { ChevronRight, Zap, Clock, ShieldCheck, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Preorder Electronic Gadgets | Phones, Laptops & Tech | Sheikh's Shop",
  description:
    "Preorder the latest smartphones, pro laptops, and luxury tech gadgets with guaranteed 24-48hr nationwide delivery across Ghana.",
};

export default async function PreorderPage() {
  const products = await getLivePreorderProducts();

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
              <span className="font-semibold text-navy">Gadget Preorder</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-navy via-navy to-[#0F172A] py-12 text-white sm:py-16">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-tan/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-tan">
              <Zap className="h-3.5 w-3.5" />
              Express Delivery • 24-48 Hours
            </span>
            <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              Electronic Gadgets Preorder
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-zinc-300">
              Lock in your preorder for the newest flagship smartphones, pro laptops, and premium audio equipment. Guaranteed authentic with express delivery to your doorstep.
            </p>

            {/* Feature Highlights */}
            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-xs">
                <Clock className="h-5 w-5 text-tan" />
                <span className="text-xs font-bold uppercase tracking-wide">24-48hr Dispatch</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-xs">
                <Truck className="h-5 w-5 text-tan" />
                <span className="text-xs font-bold uppercase tracking-wide">Nationwide Ghana</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-xs">
                <ShieldCheck className="h-5 w-5 text-tan" />
                <span className="text-xs font-bold uppercase tracking-wide">100% Genuine Warranty</span>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <div className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <CategoryNavPills />
          </div>

          <CategoryProductGrid
            products={products}
            categoryTitle="Preorder Gadgets"
          />
        </div>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
