"use client";

import React from "react";
import AdminProductCard from "@/components/admin/AdminProductCard";
import { FEATURED_PRODUCTS, type Product } from "@/data/products";
import { useCart } from "@/components/CartProvider";
import { useInView } from "@/lib/useInView";

interface FeaturedProductsProps {
  products?: readonly Product[];
}

export default function AdminFeaturedProducts({ products: explicitProducts }: FeaturedProductsProps = {}) {
  const displayProducts =
    explicitProducts && explicitProducts.length > 0
      ? explicitProducts
      : FEATURED_PRODUCTS;
  const { addToCart } = useCart();
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.15,
    triggerOnce: true,
  });

  return (
    <section
      aria-label="Featured products collection"
      className="w-full bg-tan py-12 md:py-16"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <h2 className="mb-8 text-center text-[20px] font-bold uppercase tracking-wide text-navy">
          Featured Products
        </h2>

        {/* 3-Card Centered Compact Grid with Staggered Scroll Animation */}
        <div
          ref={ref}
          className="mx-auto grid max-w-[900px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayProducts.map((product, index) => (
            <div
              key={product.id}
              style={{ transitionDelay: `${index * 120}ms` }}
              className={`transition-all duration-500 ease-out ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0"
              }`}
            >
              <AdminProductCard
                product={product}
                onAddToCart={(item) => addToCart(item, 1)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
