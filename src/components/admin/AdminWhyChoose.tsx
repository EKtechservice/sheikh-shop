"use client";

import React from "react";
import { ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { useInView } from "@/lib/useInView";

interface Feature {
  readonly icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
  readonly title: string;
  readonly description: string;
}

const FEATURES: readonly Feature[] = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description:
      "Crafted from luxury fabrics, built for durability and comfort.",
  },
  {
    icon: Truck,
    title: "Fast & Free Shipping",
    description:
      "Free shipping on all orders over $100. Delivered in 2-5 business days.",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description:
      "30-day hassle-free returns. Shop with confidence, risk-free.",
  },
] as const;

export default function AdminWhyChoose() {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.15,
    triggerOnce: true,
  });

  return (
    <section
      aria-label="Why choose Sheikh's Shop"
      className="w-full bg-surface-gray py-14 md:py-20"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="mb-10 text-center font-sans text-[22px] sm:text-[28px] md:text-[32px] font-extrabold uppercase tracking-wide text-navy">
          Why Choose Sheikh&apos;s Shop
        </h2>

        {/* 3-Column Grid */}
        <div ref={ref} className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
                className={`group flex flex-col items-center text-center transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0"
                }`}
              >
                {/* Icon with subtle hover lift and scale */}
                <div className="mb-4 inline-flex items-center justify-center transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-110 motion-reduce:group-hover:translate-y-0">
                  <Icon
                    className="h-10 w-10 text-navy"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-[18px] font-semibold text-brand-black">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="max-w-xs text-[14px] leading-relaxed text-text-muted">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
