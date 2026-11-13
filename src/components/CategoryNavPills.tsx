"use client";

import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

interface CategoryNavPillsProps {
  activeSlug?: string;
}

export default function CategoryNavPills({ activeSlug }: CategoryNavPillsProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 min-w-max">
        <Link
          href="/categories"
          className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            !activeSlug
              ? "bg-navy text-white shadow-sm"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
          }`}
        >
          All
        </Link>

        {CATEGORIES.map((cat) => {
          const isActive = activeSlug?.toLowerCase() === cat.slug.toLowerCase();
          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? "bg-navy text-white shadow-sm"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {cat.name}
            </Link>
          );
        })}

        <Link
          href="/new-arrivals"
          className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            activeSlug === "new-arrivals"
              ? "bg-navy text-white shadow-sm"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
          }`}
        >
          New Arrivals
        </Link>

        <Link
          href="/sale"
          className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            activeSlug === "sale"
              ? "bg-sale-red text-white shadow-sm"
              : "bg-red-50 text-sale-red hover:bg-red-100"
          }`}
        >
          Sale %
        </Link>
      </div>
    </div>
  );
}
