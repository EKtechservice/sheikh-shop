import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import CategoryProductGrid from "@/components/CategoryProductGrid";
import CategoryNavPills from "@/components/CategoryNavPills";
import Newsletter from "@/components/Newsletter";
import { CATEGORIES, getCategoryBySlug } from "@/data/categories";
import { getLiveProductsByCategory } from "@/lib/products";
import { ChevronRight } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | Sheikh's Shop",
    };
  }

  return {
    title: `${category.name} | Sheikh's Shop Menswear`,
    description: category.description || `Explore our luxury collection of ${category.name} at Sheikh's Shop.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getLiveProductsByCategory(category.slug);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 1. Top Bar & Navigation */}
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
              <Link href="/categories" className="hover:text-navy transition-colors">
                Categories
              </Link>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <span className="font-semibold text-navy">{category.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Category Banner */}
        <section className="relative overflow-hidden bg-gradient-to-r from-navy via-navy to-navy-dark text-white py-12 sm:py-16">
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-xl">
                {category.onSale && (
                  <span className="inline-block mb-3 rounded-full bg-sale-red/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs">
                    Special Collection • On Sale
                  </span>
                )}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white">
                  {category.name}
                </h1>
                {category.tagline && (
                  <p className="mt-2 text-base sm:text-lg font-medium text-tan">
                    {category.tagline}
                  </p>
                )}
                {category.description && (
                  <p className="mt-3 text-sm text-zinc-300 leading-relaxed max-w-lg">
                    {category.description}
                  </p>
                )}
              </div>

              {/* Category Image Thumbnail */}
              <div className="relative h-36 w-36 sm:h-44 sm:w-44 shrink-0 rounded-2xl bg-white/10 p-3 backdrop-blur-xs border border-white/15 shadow-xl mx-auto md:mx-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  priority
                  className="object-contain p-2"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
          {/* Category Switcher Pills */}
          <div className="mb-8">
            <CategoryNavPills activeSlug={category.slug} />
          </div>

          {/* Product Grid */}
          <CategoryProductGrid
            products={products}
            categoryTitle={category.name}
          />
        </div>

        {/* Newsletter Section */}
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
