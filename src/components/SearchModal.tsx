"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ALL_PRODUCTS, type Product } from "@/data/products";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/utils";
import { Search, X, ArrowRight, Tag, Sparkles } from "lucide-react";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scrollLock";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  "Quality Shirts",
  "Budget Shirts",
  "Slides",
  "Joggers",
  "Shorts",
  "Polo Shirts",
  "Combo Deals",
  "Perfumes",
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [liveProducts, setLiveProducts] = useState<readonly Product[]>(ALL_PRODUCTS);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load latest live products from Supabase
  useEffect(() => {
    let isMounted = true;
    async function loadLatest() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (data && data.length > 0 && isMounted) {
          const mapped: Product[] = data.map((r) => ({
            id: r.id,
            name: r.name,
            slug: r.slug,
            category: r.category ?? undefined,
            categoryName: r.category_name ?? undefined,
            price: Number(r.price),
            compareAtPrice: r.compare_at_price ? Number(r.compare_at_price) : undefined,
            image: r.image,
            onSale: Boolean(r.on_sale),
            isNewArrival: Boolean(r.is_new_arrival),
            description: r.description ?? undefined,
            inStock: Boolean(r.in_stock),
            sizes: r.sizes && r.sizes.length > 0 ? r.sizes : undefined,
          }));
          setLiveProducts(mapped);
        }
      } catch {
        // Fallback to ALL_PRODUCTS
      }
    }
    loadLatest();
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Focus input on open & manage Android hardware back-button navigation
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      // Push history entry for back-button modal dismiss
      window.history.pushState({ modal: "search" }, "");

      const handlePopState = () => {
        onClose();
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("popstate", handlePopState);
      };
    } else {
      setQuery("");
    }
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      lockBodyScroll();
      return () => {
        unlockBodyScroll();
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Filter products by search query
  const matchingProducts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return liveProducts.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(trimmed);
      const categoryMatch = product.category?.toLowerCase().includes(trimmed);
      const categoryNameMatch = product.categoryName?.toLowerCase().includes(trimmed);
      const descriptionMatch = product.description?.toLowerCase().includes(trimmed);
      const sizesMatch = product.sizes?.some((s) => s.toLowerCase().includes(trimmed));

      return nameMatch || categoryMatch || categoryNameMatch || descriptionMatch || sizesMatch;
    });
  }, [query, liveProducts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    inputRef.current?.blur(); // Dismiss virtual keyboard on touch devices
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectQuickSearch = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search menswear collection"
      className="fixed inset-0 z-50 flex items-start justify-center pt-0 sm:pt-20 px-0 sm:px-4 bg-black/75 backdrop-blur-sm transition-opacity"
    >
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl h-full sm:h-auto max-h-screen max-h-[100dvh] sm:max-h-[85vh] rounded-none sm:rounded-2xl bg-white shadow-2xl border-0 sm:border border-zinc-200 overflow-hidden flex flex-col z-10 animate-pop-check pt-safe pb-safe pl-safe pr-safe">
        {/* Search Header Input */}
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center border-b border-zinc-200 px-4 py-3.5 sm:px-6 shrink-0 bg-white"
        >
          <Search className="h-5 w-5 text-zinc-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shirts, polos, slides, joggers..."
            enterKeyHint="search"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            className="w-full text-base sm:text-lg font-medium text-navy placeholder:text-zinc-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center text-zinc-400 hover:text-zinc-600"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-navy transition-colors"
            aria-label="Close search"
          >
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline mr-1">
              Esc
            </span>
            <X className="h-5 w-5" />
          </button>
        </form>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-6">
          {/* 1. Live Results if Query is Typed */}
          {query.trim() ? (
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                  Matching Products ({matchingProducts.length})
                </span>
                {matchingProducts.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex min-h-[44px] items-center text-xs font-bold uppercase tracking-wider text-navy hover:text-tan gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>

              {matchingProducts.length > 0 ? (
                <div className="mt-3 divide-y divide-zinc-100">
                  {matchingProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="group flex items-center justify-between py-3 px-2 rounded-xl hover:bg-zinc-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-zinc-100 p-1">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-0.5"
                          />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-navy group-hover:text-tan transition-colors">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-text-muted">
                            {product.categoryName || "Menswear"}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-bold text-navy">
                          {formatPrice(product.price)}
                        </p>
                        {product.compareAtPrice && (
                          <p className="text-[10px] text-zinc-400 line-through">
                            {formatPrice(product.compareAtPrice)}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-sm text-text-muted">
                  <p>No products found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs mt-1">
                    Try searching for &quot;shirts&quot;, &quot;slides&quot;, &quot;joggers&quot;, or &quot;shorts&quot;.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* 2. Popular & Fast Search Suggestions */
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5 mb-3">
                <Sparkles className="h-3.5 w-3.5 text-tan" />
                <span>Popular Searches</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleSelectQuickSearch(term)}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-700 hover:border-navy hover:bg-navy hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {/* Quick Category Jump */}
              <div className="mt-6 border-t border-zinc-100 pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5 mb-3">
                  <Tag className="h-3.5 w-3.5 text-tan" />
                  <span>Browse Departments</span>
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { name: "Shirts (Quality & Budget)", href: "/categories/shirts" },
                    { name: "Polo Shirts", href: "/categories/polo-shirts" },
                    { name: "Shorts", href: "/categories/shorts" },
                    { name: "Black Slides", href: "/categories/slides" },
                    { name: "Combo Deals", href: "/categories/combo-deals" },
                    { name: "All Categories", href: "/categories" },
                  ].map((dept) => (
                    <Link
                      key={dept.name}
                      href={dept.href}
                      onClick={onClose}
                      className="flex min-h-[44px] items-center rounded-lg p-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 hover:text-navy font-medium transition-colors"
                    >
                      {dept.name} &rarr;
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-zinc-200 bg-zinc-50 px-4 sm:px-6 py-3 flex items-center justify-between text-[11px] text-zinc-500 shrink-0">
          <span>Press <strong>Enter</strong> to search</span>
          <Link
            href="/categories"
            onClick={onClose}
            className="text-navy font-bold hover:underline"
          >
            Explore Full Shop &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
