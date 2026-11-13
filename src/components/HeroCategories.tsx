"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { HERO_BLUR_DATA_URL, SQUARE_BLUR_DATA_URL } from "@/lib/utils";
import { useInView } from "@/lib/useInView";

export default function HeroCategories() {
  const { ref: gridRef, isInView: isGridInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      aria-label="Hero and product categories"
      className="w-full bg-white py-12 md:py-16"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 lg:items-center">
          
          {/* COLUMN A (cols 1–3 on desktop): Hero Text */}
          <div className="flex flex-col justify-center text-center lg:col-span-3 lg:text-left transition-all duration-700 ease-out">
            <h1 className="font-sans text-[26px] sm:text-[30px] lg:text-[32px] font-extrabold uppercase leading-[1.12] tracking-tight text-navy">
              Tailored for the
              <br />
              Modern Man
            </h1>

            <p className="mt-3.5 sm:mt-4 max-w-[290px] mx-auto lg:mx-0 text-[14px] leading-relaxed text-text-muted">
              Elevate your wardrobe with premium menswear essentials. Crafted in
              luxury fabrics for comfort, style, and confidence.
            </p>

            <div className="mt-6 flex justify-center lg:justify-start">
              <Link
                href="/new-arrivals"
                className="group inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-navy-dark hover:shadow-lg focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus:outline-none"
              >
                <span>Shop New Arrivals</span>
                <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* COLUMN B (cols 4–6 on desktop): Hero Image */}
          <div className="mx-auto w-full max-w-sm sm:max-w-md lg:col-span-3 lg:max-w-none">
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-tan shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl animate-float-slow">
              <Image
                src="/images/hero-shirt-v2.jpg"
                alt="Folded luxury black dress shirt on warm kraft tan background"
                fill
                priority
                fetchPriority="high"
                placeholder="blur"
                blurDataURL={HERO_BLUR_DATA_URL}
                sizes="(min-width: 1280px) 270px, (min-width: 1024px) 220px, (min-width: 640px) 450px, 92vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
              />
            </div>
          </div>

          {/* COLUMN C (cols 7–12 on desktop): Shop by Category */}
          <div className="flex flex-col lg:col-span-6">
            <h2 className="mb-5 text-center text-[18px] font-bold uppercase tracking-wider text-navy">
              Shop by Category
            </h2>

            {/* Category Grid: 3 columns x 2 rows with staggered entrance */}
            <div ref={gridRef} className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-3">
              {CATEGORIES.map((category, index) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  style={{
                    transitionDelay: `${index * 60}ms`,
                  }}
                  className={`group relative flex flex-col items-center rounded-xl border border-zinc-200 bg-white p-2.5 sm:p-3 shadow-xs transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-navy/60 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus:outline-none ${
                    isGridInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0"
                  }`}
                >
                  {/* Red SALE Badge with subtle pulse */}
                  {category.onSale && (
                    <span className="absolute top-2 right-2 z-10 rounded bg-[#D32F2F] px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none text-white shadow-xs animate-pulse-subtle">
                      Sale
                    </span>
                  )}

                  {/* Product Image Container */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-50 transition-colors duration-200 group-hover:bg-zinc-100/60">
                    <Image
                      src={category.image}
                      alt={`Browse ${category.name} collection`}
                      fill
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={SQUARE_BLUR_DATA_URL}
                      sizes="(min-width: 1280px) 160px, (min-width: 1024px) 140px, (min-width: 640px) 200px, 42vw"
                      className="object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-110"
                    />
                  </div>

                  {/* Category Name */}
                  <span className="mt-2 text-center text-[13px] sm:text-[14px] font-medium text-navy transition-colors duration-200 group-hover:text-brand-black line-clamp-1">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
