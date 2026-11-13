import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import CategoryNavPills from "@/components/CategoryNavPills";
import Newsletter from "@/components/Newsletter";
import { CATEGORIES } from "@/data/categories";
import { getLiveProducts } from "@/lib/products";
import { ChevronRight, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop All Categories | Sheikh's Shop Menswear",
  description:
    "Explore all menswear categories at Sheikh's Shop: Shirts, Polo Shirts, Shorts, Jeans, Boxers, Perfumes, Slides, Combo Deals, and Birthday Gifts.",
};

export default async function CategoriesPage() {
  const allLiveProducts = await getLiveProducts();
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
              <span className="font-semibold text-navy">All Categories</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-navy py-12 text-white sm:py-16">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-tan">
              Sheikh&apos;s Shop Collection
            </span>
            <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              Shop by Category
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-zinc-300">
              Browse our curated departments for modern gentlemen. Hand-selected fabrics, luxury perfumes, tailored menswear, and exclusive bundle savings.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <CategoryNavPills />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => {
              const count = allLiveProducts.filter(
                (p) => p.category?.toLowerCase() === category.slug.toLowerCase()
              ).length;
              return (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-navy hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                >
                  {/* Top Header */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-tan">
                        {count} {count === 1 ? "Product" : "Products"} Available
                      </span>
                      {category.onSale && (
                        <span className="rounded bg-sale-red px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow-xs">
                          Sale
                        </span>
                      )}
                    </div>

                    <h2 className="mt-2 text-xl font-bold uppercase text-navy transition-colors group-hover:text-tan">
                      {category.name}
                    </h2>

                    {category.tagline && (
                      <p className="mt-1 text-xs font-medium text-text-muted">
                        {category.tagline}
                      </p>
                    )}
                  </div>

                  {/* Image Presentation */}
                  <div className="relative my-6 aspect-square w-full overflow-hidden rounded-xl bg-zinc-50 p-4 transition-colors group-hover:bg-zinc-100/70">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      loading="lazy"
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-108"
                    />
                  </div>

                  {/* Bottom Action */}
                  <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-xs font-bold uppercase tracking-wider text-navy group-hover:text-tan">
                    <span>Explore {category.name}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
