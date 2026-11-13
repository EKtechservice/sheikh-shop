import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import CategoryProductGrid from "@/components/CategoryProductGrid";
import CategoryNavPills from "@/components/CategoryNavPills";
import Newsletter from "@/components/Newsletter";
import { type Product } from "@/data/products";
import { getLiveProducts } from "@/lib/products";
import { ChevronRight, Search as SearchIcon, ArrowLeft } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const term = q?.trim();

  return {
    title: term
      ? `Search results for "${term}" | Sheikh Trading Enterprise`
      : "Search Products | Sheikh Trading Enterprise",
    description: "Search modern menswear, shirts, shorts, slides, and deals at Sheikh Trading Enterprise.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const searchTerm = (q || "").trim();
  const lowerSearch = searchTerm.toLowerCase();

  const allProducts = await getLiveProducts();
  const results: Product[] = searchTerm
    ? allProducts.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(lowerSearch);
        const catMatch = product.category?.toLowerCase().includes(lowerSearch);
        const catNameMatch = product.categoryName?.toLowerCase().includes(lowerSearch);
        const descMatch = product.description?.toLowerCase().includes(lowerSearch);
        return nameMatch || catMatch || catNameMatch || descMatch;
      })
    : [];

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
              <span className="font-semibold text-navy">Search Results</span>
            </nav>
          </div>
        </div>

        {/* Hero Search Header */}
        <section className="bg-gradient-to-r from-navy via-navy to-navy-dark py-12 text-white sm:py-16">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-tan">
              <SearchIcon className="h-3.5 w-3.5" />
              Store Catalog Search
            </span>

            <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight">
              {searchTerm ? (
                <>
                  Results for <span className="text-tan">&ldquo;{searchTerm}&rdquo;</span>
                </>
              ) : (
                "Search Menswear Collection"
              )}
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-zinc-300">
              {searchTerm
                ? `Found ${results.length} item${results.length === 1 ? "" : "s"} matching your search query.`
                : "Type keywords above or browse our curated departments below."}
            </p>
          </div>
        </section>

        {/* Main Results Area */}
        <div className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
          {/* Category Switcher Pills */}
          <div className="mb-8">
            <CategoryNavPills />
          </div>

          {results.length > 0 ? (
            <CategoryProductGrid
              products={results}
              categoryTitle={`Search "${searchTerm}"`}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center max-w-xl mx-auto my-8">
              <SearchIcon className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
              <h2 className="text-lg font-bold uppercase text-navy">
                No Exact Matches Found
              </h2>
              <p className="mt-2 text-xs text-text-muted leading-relaxed">
                We couldn&apos;t find any products matching &ldquo;{searchTerm}&rdquo;. Try searching for general terms like <strong>shirts</strong>, <strong>shorts</strong>, <strong>slides</strong>, or <strong>perfumes</strong>.
              </p>
              <div className="mt-6">
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-navy-dark transition-all"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Browse All Categories</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
