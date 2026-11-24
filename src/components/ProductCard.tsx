"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice, SQUARE_BLUR_DATA_URL } from "@/lib/utils";
import { ZoomIn } from "lucide-react";
import ProductImageZoomModal from "@/components/ProductImageZoomModal";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (onAddToCart) {
      onAddToCart(product);
    }

    setIsAdded(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-white p-4 shadow-md transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl">
      {/* Top-Right "Out of Stock" Badge */}
      {product.onSale && (
        <span className="absolute top-3 right-3 z-10 rounded bg-[#D32F2F] px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none text-white shadow-xs animate-pulse-subtle">
          Out of Stock
        </span>
      )}

      {/* Top Details Section */}
      <div className="flex flex-col items-center">
        {/* Product Image Wrapper with Quick Zoom */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-50 flex items-center justify-center transition-colors duration-200 group-hover:bg-zinc-100/60">
          <Link
            href={`/products/${product.slug}`}
            className="absolute inset-0 z-0 focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus:outline-none"
            aria-label={`View ${product.name} product details`}
          >
            {/* Front Image */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              loading="lazy"
              placeholder="blur"
              blurDataURL={SQUARE_BLUR_DATA_URL}
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
              className={`object-contain p-4 transition-all duration-300 ease-out group-hover:scale-108 ${
                product.backImage ? "group-hover:opacity-0" : ""
              }`}
            />

            {/* Back Image (Hover Reveal) */}
            {product.backImage && (
              <Image
                src={product.backImage}
                alt={`${product.name} Back View`}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                className="object-contain p-4 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-108"
              />
            )}

            {/* Visual Indicator Pill if product has both angles */}
            {product.backImage && (
              <span className="absolute bottom-2 left-2 z-10 rounded-md bg-black/60 backdrop-blur-xs px-1.5 py-0.5 text-[9px] font-semibold text-white/90 opacity-70 group-hover:opacity-100 transition-opacity">
                Front &amp; Back
              </span>
            )}
          </Link>

          {/* Quick Zoom / Inspect Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsZoomOpen(true);
            }}
            aria-label={`Zoom and inspect ${product.name}`}
            title="Zoom & Inspect Fabric"
            className="absolute top-2.5 left-2.5 z-10 inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-full bg-white/95 hover:bg-white text-navy shadow-sm backdrop-blur-xs transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100 border border-zinc-200/80"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
        </div>

        {/* Product Name */}
        <h3 className="mt-4 text-center text-[15px] font-semibold text-neutral-900 transition-colors duration-200 group-hover:text-navy">
          <Link
            href={`/products/${product.slug}`}
            className="focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus:outline-none rounded-xs"
          >
            {product.name}
          </Link>
        </h3>

        {/* Centered Price Row */}
        <div className="mt-1.5 flex items-center justify-center gap-2 text-center">
          <span className="text-[15px] font-bold text-neutral-900">
            {formatPrice(product.price)}
          </span>
          {typeof product.compareAtPrice === "number" && (
            <span className="text-xs text-text-muted line-through">
              <span className="sr-only">Original price: </span>
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Button Action */}
      <div className="mt-5 w-full">
        <button
          type="button"
          onClick={handleAddToCart}
          aria-live="polite"
          aria-label={`Add ${product.name} to cart`}
          className={`w-full min-h-[44px] inline-flex items-center justify-center rounded-md py-2.5 text-[13px] font-semibold text-white shadow-xs transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus:outline-none cursor-pointer ${
            isAdded
              ? "bg-emerald-600 hover:bg-emerald-700 animate-pop-check"
              : "bg-navy hover:bg-navy-dark hover:shadow-md"
          }`}
        >
          {isAdded ? "Added ✓" : "Add to Cart"}
        </button>
      </div>

      {/* Quick Zoom & Inspect Modal */}
      <ProductImageZoomModal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        productName={product.name}
        categoryName={product.categoryName}
        frontImage={product.image}
        backImage={product.backImage}
      />
    </article>
  );
}
