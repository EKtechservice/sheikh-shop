"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/CartProvider";
import { ShoppingBag, Check, ShieldCheck, Truck, Store, ArrowLeft } from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: readonly Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeSide, setActiveSide] = useState<"front" | "back">("front");

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize || undefined);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
        )
      : null;

  const currentDisplayImage =
    activeSide === "back" && product.backImage ? product.backImage : product.image;

  return (
    <div className="mx-auto max-w-content px-4 py-6 sm:py-8 sm:px-6 lg:px-8 pb-safe">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href={`/categories/${product.category}`}
          className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-navy transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to {product.categoryName}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left Column: Product Image Gallery (Front & Back Views) */}
        <div className="flex flex-col space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8 shadow-sm">
            {product.onSale && (
              <span className="absolute top-4 left-4 z-10 rounded bg-[#D32F2F] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
                Sale {discountPercent ? `-${discountPercent}%` : ""}
              </span>
            )}

            {/* Front / Back Indicator Badge */}
            {product.backImage && (
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/90 backdrop-blur-xs px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs">
                  <span className={`h-2 w-2 rounded-full ${activeSide === "front" ? "bg-[#B98B63]" : "bg-sky-400"}`} />
                  {activeSide === "front" ? "Front View" : "Back View"}
                </span>
              </div>
            )}

            <Image
              key={currentDisplayImage}
              src={currentDisplayImage}
              alt={`${product.name} ${activeSide === "front" ? "Front View" : "Back View"}`}
              fill
              priority
              sizes="(min-width: 1024px) 500px, 92vw"
              className="object-contain p-4 sm:p-6 transition-all duration-300 hover:scale-105"
            />
          </div>

          {/* Dual Angle Thumbnail Switcher (Front & Back) */}
          {product.backImage && (
            <div className="flex items-center gap-3">
              {/* Front Thumbnail Button */}
              <button
                type="button"
                onClick={() => setActiveSide("front")}
                className={`group flex items-center gap-2.5 rounded-xl border p-2 text-left transition-all min-h-[56px] flex-1 cursor-pointer ${
                  activeSide === "front"
                    ? "border-navy bg-navy/5 shadow-xs ring-1 ring-navy"
                    : "border-zinc-200 bg-white hover:border-zinc-400"
                }`}
              >
                <div className="relative h-12 w-12 shrink-0 rounded-lg bg-zinc-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.name} Front View`}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-navy">
                    Front View
                  </p>
                  <p className="text-[10px] text-text-muted">Primary Angle</p>
                </div>
              </button>

              {/* Back Thumbnail Button */}
              <button
                type="button"
                onClick={() => setActiveSide("back")}
                className={`group flex items-center gap-2.5 rounded-xl border p-2 text-left transition-all min-h-[56px] flex-1 cursor-pointer ${
                  activeSide === "back"
                    ? "border-navy bg-navy/5 shadow-xs ring-1 ring-navy"
                    : "border-zinc-200 bg-white hover:border-zinc-400"
                }`}
              >
                <div className="relative h-12 w-12 shrink-0 rounded-lg bg-zinc-100 overflow-hidden">
                  <Image
                    src={product.backImage}
                    alt={`${product.name} Back View`}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-navy">
                    Back View
                  </p>
                  <p className="text-[10px] text-text-muted">Reverse Angle</p>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Product Information & Buying Options */}
        <div className="flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-wider text-tan">
            {product.categoryName}
          </span>

          <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy">
            {product.name}
          </h1>

          {/* Pricing */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-navy">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-zinc-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            {discountPercent && (
              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-sale-red">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-zinc-600">
              {product.description}
            </p>
          )}

          {/* Sizes / Options with >= 44x44px touch targets */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-6">
              <label className="text-xs font-bold uppercase tracking-wider text-navy block mb-2.5">
                Select Option / Size:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      selectedSize === size
                        ? "border-navy bg-navy text-white shadow-xs"
                        : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 active:bg-zinc-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch">
            {/* Quantity Selector with 44px buttons */}
            <div className="flex items-center justify-between sm:justify-start rounded-xl border border-zinc-300 bg-white px-2 shadow-xs min-h-[48px]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center text-xl font-bold text-zinc-600 hover:text-navy active:text-navy transition-colors"
                aria-label="Decrease quantity"
              >
                &minus;
              </button>
              <span className="w-12 text-center text-sm font-bold text-navy">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-11 w-11 items-center justify-center text-xl font-bold text-zinc-600 hover:text-navy active:text-navy transition-colors"
                aria-label="Increase quantity"
              >
                &#43;
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 flex min-h-[50px] items-center justify-center gap-2 rounded-xl py-3.5 px-6 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 cursor-pointer active:scale-98 ${
                isAdded
                  ? "bg-green-700 shadow-lg scale-102"
                  : "bg-navy hover:bg-navy-dark hover:shadow-xl hover:-translate-y-0.5"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" />
                  <span>Add to Bag &bull; {formatPrice(product.price * quantity)}</span>
                </>
              )}
            </button>

            {/* Quick View Cart Button */}
            <Link
              href="/cart"
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border-2 border-navy px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition-all duration-300 hover:bg-navy hover:text-white"
            >
              <span>View Bag</span>
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>

          {/* Store Guarantees */}
          <div className="mt-8 border-t border-zinc-200 pt-6 space-y-3">
            <div className="flex items-center gap-3 text-xs font-medium text-zinc-700">
              <Store className="h-4 w-4 text-tan shrink-0" />
              <span><strong>Free Store Pickup</strong> Available &bull; Order Online, Pick Up Today</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-zinc-700">
              <Truck className="h-4 w-4 text-tan shrink-0" />
              <span><strong>Nationwide Express Delivery</strong> Across Ghana (24-48 Hours)</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-zinc-700">
              <ShieldCheck className="h-4 w-4 text-tan shrink-0" />
              <span><strong>100% Guaranteed Authentic</strong> &amp; Quality Inspected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 sm:mt-20 border-t border-zinc-200 pt-10 sm:pt-12">
          <h2 className="mb-6 sm:mb-8 text-xl sm:text-2xl font-bold uppercase tracking-wide text-navy">
            More in {product.categoryName}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {relatedProducts.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-xs transition-all hover:border-navy hover:shadow-md"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-50 p-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy group-hover:text-tan transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-navy">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
