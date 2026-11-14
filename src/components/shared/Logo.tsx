import React from "react";
import Link from "next/link";

interface LogoProps {
  readonly href?: string;
  readonly className?: string;
  readonly subtitle?: string;
}

export default function Logo({
  href = "/",
  className = "",
  subtitle = "menswear",
}: LogoProps) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-2 sm:gap-2.5 rounded-xs focus-visible:ring-2 focus-visible:ring-white/70 focus:outline-none ${className}`}
      aria-label="Sheikh's Shop"
    >
      {/* Decorative Geometric Diamond Lattice / Knotwork Crest (Champagne Gold #E5D3B3) */}
      <svg
        width={24}
        height={24}
        style={{ width: "24px", height: "24px", maxWidth: "24px", maxHeight: "24px" }}
        className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-[#E5D3B3] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Outer Diamond Contour */}
        <polygon points="12,2 22,12 12,22 2,12" />
        {/* Interlocking Inner Geometric Rhombus Grid */}
        <polygon points="12,6 18,12 12,18 6,12" />
        <line x1="7" y1="7" x2="17" y2="17" />
        <line x1="17" y1="7" x2="7" y2="17" />
        <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="1 3" />
        <line x1="2" y1="12" x2="22" y2="12" strokeDasharray="1 3" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>

      {/* Wordmark & Sub-label */}
      <div className="flex flex-col">
        <span className="font-logo text-[23px] xs:text-[26px] sm:text-[28px] font-semibold leading-none tracking-wide text-white">
          Sheikh&apos;s Shop
        </span>
        <span className="mt-1 font-sans text-[10px] sm:text-[11px] font-normal uppercase tracking-[0.2em] text-zinc-400 pl-0.5 leading-none">
          {subtitle}
        </span>
      </div>
    </Link>
  );
}
