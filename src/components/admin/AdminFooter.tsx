import React from "react";
import Link from "next/link";
import AdminLogo from "@/components/admin/AdminLogo";

interface FooterLink {
  readonly name: string;
  readonly href: string;
}

interface FooterLinkGroup {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

const FOOTER_NAV: readonly FooterLinkGroup[] = [
  {
    title: "SHOP",
    links: [
      { name: "New Arrivals", href: "/new-arrivals" },
      { name: "Shirts", href: "/categories/shirts" },
      { name: "Polo Shirts", href: "/categories/polo-shirts" },
      { name: "Shorts", href: "/categories/shorts" },
      { name: "Jeans", href: "/categories/jeans" },
      { name: "Boxers", href: "/categories/boxers" },
      { name: "Perfumes", href: "/categories/perfumes" },
      { name: "Slides", href: "/categories/slides" },
      { name: "Combo Deals", href: "/categories/combo-deals" },
      { name: "Birthday Gifts", href: "/categories/birthday-gifts" },
      { name: "Sale", href: "/sale" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { name: "Contact Us", href: "/support/contact" },
      { name: "FAQs", href: "/support/faqs" },
      { name: "Shipping & Returns", href: "/support/shipping-returns" },
      { name: "Size Guide", href: "/support/size-guide" },
      { name: "Track Order", href: "/support/track-order" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/about" },
      { name: "Careers", href: "/about#careers" },
      { name: "Store Locator", href: "/contact" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
] as const;

export default function AdminFooter() {
  return (
    <footer aria-label="Site footer" className="w-full bg-footer-black text-white">
      {/* Main Footer Block */}
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-8">
          {/* COLUMN 1: Brand & Tagline */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <AdminLogo />

            <p className="mt-4 max-w-[220px] text-[14px] leading-relaxed text-zinc-400">
              Elevating modern menswear with timeless essentials.
            </p>
          </div>

          {/* COLUMNS 2, 3, 4: Navigation Link Groups */}
          {FOOTER_NAV.map((group) => (
            <div key={group.title} className="flex flex-col">
              <h3 className="mb-4 text-[16px] sm:text-[18px] font-bold uppercase tracking-wider text-white">
                {group.title}
              </h3>

              <nav aria-label={group.title}>
                <ul className="space-y-2 sm:space-y-3">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="inline-block py-1 text-[14px] font-medium text-white/90 transition-colors duration-200 hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-white/70 focus:outline-none rounded-xs"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM COPYRIGHT BAR with Safe Area Padding */}
      <div className="w-full bg-footer-bottom py-4 pb-safe">
        <div className="mx-auto max-w-content px-4 text-center sm:px-6 lg:px-8">
          <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-[13px] text-zinc-400">
            <span>&copy; 2026 Sheikh&apos;s Shop. All rights reserved.</span>
            <span
              className="hidden sm:inline-block text-zinc-600"
              aria-hidden="true"
            >
              •
            </span>
            <span>Powered by secure payments</span>
            <span
              className="hidden sm:inline-block text-zinc-600"
              aria-hidden="true"
            >
              •
            </span>
            <Link
              href="/privacy"
              className="py-1 px-1 underline-offset-4 hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-white/70 focus:outline-none rounded-xs"
            >
              Privacy
            </Link>
            <span
              className="hidden sm:inline-block text-zinc-600"
              aria-hidden="true"
            >
              •
            </span>
            <Link
              href="/terms"
              className="py-1 px-1 underline-offset-4 hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-white/70 focus:outline-none rounded-xs"
            >
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
