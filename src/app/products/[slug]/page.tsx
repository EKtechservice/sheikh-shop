import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import ProductDetailView from "@/components/ProductDetailView";
import Newsletter from "@/components/Newsletter";
import { ALL_PRODUCTS } from "@/data/products";
import { getLiveProductBySlug, getLiveProductsByCategory } from "@/lib/products";
import { ChevronRight } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getLiveProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Sheikh's Shop",
    };
  }

  return {
    title: `${product.name} | Sheikh's Shop Menswear`,
    description: product.description || `Buy ${product.name} at Sheikh's Shop. Premium quality menswear.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getLiveProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = (await getLiveProductsByCategory(product.category || "")).filter(
    (p) => p.id !== product.id
  );

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
              <Link href="/categories" className="hover:text-navy transition-colors">
                Categories
              </Link>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <Link
                href={`/categories/${product.category}`}
                className="hover:text-navy transition-colors"
              >
                {product.categoryName}
              </Link>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <span className="font-semibold text-navy truncate max-w-[200px]">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Product Details Component */}
        <ProductDetailView
          product={product}
          relatedProducts={relatedProducts}
        />

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
