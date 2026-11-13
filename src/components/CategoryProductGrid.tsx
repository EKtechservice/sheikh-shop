"use client";

import React, { useState, useMemo } from "react";
import type { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/components/CartProvider";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

interface CategoryProductGridProps {
  products: readonly Product[];
  categoryTitle: string;
}

export default function CategoryProductGrid({
  products,
  categoryTitle,
}: CategoryProductGridProps) {
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");

  const sortedProducts = useMemo(() => {
    const list = [...products];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "name":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [products, sortBy]);

  return (
    <div className="w-full">
      {/* Controls Bar: Count & Sorting */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-4">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <SlidersHorizontal className="h-4 w-4 text-navy" />
          <span>
            Showing <strong className="text-navy">{sortedProducts.length}</strong> items in{" "}
            <strong className="text-navy">{categoryTitle}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
            <ArrowUpDown className="h-3.5 w-3.5" />
            Sort By:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-navy shadow-xs focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
          >
            <option value="featured">Featured / Curated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <div key={product.id} className="flex">
              <div className="w-full">
                <ProductCard
                  product={product}
                  onAddToCart={(item) => addToCart(item, 1)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center">
          <p className="text-base font-semibold text-navy">No products found in this category.</p>
          <p className="mt-1 text-sm text-text-muted">Check back soon or explore our other collections.</p>
        </div>
      )}
    </div>
  );
}
