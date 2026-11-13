import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { STORE_CONFIG } from "@/data/storeConfig";
import {
  ChevronRight,
  Ruler,
  AlertCircle,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Men's Size Guide | Sheikh Trading Enterprise",
  description:
    "Check sizing for Quality and Budget shirts, shorts, joggers, and slides (L, XL, XXL, 42-45) at Sheikh Trading Enterprise. Akyem New Tafo, Ghana.",
};

export default function SizeGuidePage() {
  const whatsappUrl =
    "https://wa.me/233593684022?text=" +
    encodeURIComponent(
      "Hello Sheikh Trading Enterprise, I need advice on my size. My height/weight is: "
    );

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <AnnouncementBar />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-zinc-100 bg-zinc-50/70 py-3">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-text-muted"
            >
              <Link href="/" className="hover:text-navy transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <Link href="/support/faqs" className="hover:text-navy transition-colors">
                Support
              </Link>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <span className="font-semibold text-navy">Size Guide</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-navy via-navy to-navy-dark py-12 text-white sm:py-16">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-tan">
              <Ruler className="h-3.5 w-3.5" />
              Fit &amp; Measurements
            </span>
            <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              Men&apos;s Size Guide
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-zinc-300">
              Find your perfect fit across our Quality &amp; Budget collections. Sizes are true to standard Ghanaian and international menswear measurements.
            </p>
          </div>
        </section>

        {/* Size Guide Content */}
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8 space-y-12">
          {/* Sizing Fast-Selling Alert */}
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-amber-600 shrink-0" />
              <div className="text-xs sm:text-sm text-amber-900">
                <span className="font-bold">Important Note on Availability:</span> Sizes <strong>XL</strong> and <strong>XXL</strong> sell out the fastest! Message us on WhatsApp before ordering to confirm your preferred colour is in stock today.
              </div>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider shadow-xs transition-all"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              <span>Check Stock ({STORE_CONFIG.phoneRaw})</span>
            </a>
          </div>

          {/* TABLE 1: SHIRTS & POLOS */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-tan">
                  Upper Body
                </span>
                <h2 className="text-xl font-bold uppercase text-navy">
                  1. Quality &amp; Budget Shirts / Polos
                </h2>
                <p className="text-xs text-text-muted mt-1">
                  Plain T-shirts, Thick Polos, and Everyday Button-Downs
                </p>
              </div>
              <span className="hidden sm:inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-navy">
                Sizes L, XL, XXL
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50 text-navy font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Size Tag</th>
                    <th className="py-3 px-4">Chest (Inches)</th>
                    <th className="py-3 px-4">Recommended Height</th>
                    <th className="py-3 px-4">Estimated Weight</th>
                    <th className="py-3 px-4">Fit Character</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-navy">L (Large)</td>
                    <td className="py-3.5 px-4 text-zinc-700">40 – 42&quot;</td>
                    <td className="py-3.5 px-4 text-zinc-600">5&apos;7&quot; – 5&apos;10&quot;</td>
                    <td className="py-3.5 px-4 text-zinc-600">65 – 75 kg</td>
                    <td className="py-3.5 px-4 text-zinc-700 font-medium">Standard athletic fit</td>
                  </tr>
                  <tr className="bg-zinc-50/50">
                    <td className="py-3.5 px-4 font-bold text-navy flex items-center gap-1.5">
                      <span>XL (Extra Large)</span>
                      <span className="rounded bg-navy text-white text-[9px] px-1.5 py-0.2 font-bold uppercase">Popular</span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-700">44 – 46&quot;</td>
                    <td className="py-3.5 px-4 text-zinc-600">5&apos;10&quot; – 6&apos;1&quot;</td>
                    <td className="py-3.5 px-4 text-zinc-600">75 – 88 kg</td>
                    <td className="py-3.5 px-4 text-zinc-700 font-medium">Comfortable, relaxed fit</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-navy flex items-center gap-1.5">
                      <span>XXL (Double Extra Large)</span>
                      <span className="rounded bg-amber-500 text-white text-[9px] px-1.5 py-0.2 font-bold uppercase">Fast Selling</span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-700">48 – 50&quot;</td>
                    <td className="py-3.5 px-4 text-zinc-600">6&apos;0&quot; and above</td>
                    <td className="py-3.5 px-4 text-zinc-600">88 – 105 kg</td>
                    <td className="py-3.5 px-4 text-zinc-700 font-medium">Generous, roomy chest &amp; arms</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* TABLE 2: SHORTS & JOGGERS */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-tan">
                  Lower Body
                </span>
                <h2 className="text-xl font-bold uppercase text-navy">
                  2. Quality &amp; Budget Shorts &amp; Black Joggers
                </h2>
                <p className="text-xs text-text-muted mt-1">
                  Above-the-knee shorts, plain shorts, and black joggers
                </p>
              </div>
              <span className="hidden sm:inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-navy">
                Waist 32 – 42
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50 text-navy font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Size Tag</th>
                    <th className="py-3 px-4">Waist Size (Inches)</th>
                    <th className="py-3 px-4">Shorts Length</th>
                    <th className="py-3 px-4">Joggers Inseam</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-navy">L (Large)</td>
                    <td className="py-3.5 px-4 text-zinc-700">32 – 34&quot;</td>
                    <td className="py-3.5 px-4 text-zinc-600">Above the knee (approx. 18&quot;)</td>
                    <td className="py-3.5 px-4 text-zinc-600">30&quot; inseam</td>
                  </tr>
                  <tr className="bg-zinc-50/50">
                    <td className="py-3.5 px-4 font-bold text-navy">XL (Extra Large)</td>
                    <td className="py-3.5 px-4 text-zinc-700">36 – 38&quot;</td>
                    <td className="py-3.5 px-4 text-zinc-600">Above the knee (approx. 19&quot;)</td>
                    <td className="py-3.5 px-4 text-zinc-600">31&quot; inseam</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-navy">XXL (Double Extra Large)</td>
                    <td className="py-3.5 px-4 text-zinc-700">40 – 42&quot;</td>
                    <td className="py-3.5 px-4 text-zinc-600">Above the knee (approx. 20&quot;)</td>
                    <td className="py-3.5 px-4 text-zinc-600">32&quot; inseam</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* TABLE 3: SLIDES */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-tan">
                  Footwear
                </span>
                <h2 className="text-xl font-bold uppercase text-navy">
                  3. Men&apos;s Comfort Slides (Black Only)
                </h2>
                <p className="text-xs text-text-muted mt-1">
                  Molded sole comfort slides with textured strap
                </p>
              </div>
              <span className="hidden sm:inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-navy">
                Sizes 42 to 45
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50 text-navy font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">EU / Ghana Shoe Size</th>
                    <th className="py-3 px-4">UK Equivalent</th>
                    <th className="py-3 px-4">US Equivalent</th>
                    <th className="py-3 px-4">Foot Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-navy">Size 42</td>
                    <td className="py-3.5 px-4 text-zinc-700">UK 8</td>
                    <td className="py-3.5 px-4 text-zinc-600">US 8.5 – 9</td>
                    <td className="py-3.5 px-4 text-zinc-600">26.5 cm</td>
                  </tr>
                  <tr className="bg-zinc-50/50">
                    <td className="py-3.5 px-4 font-bold text-navy">Size 43</td>
                    <td className="py-3.5 px-4 text-zinc-700">UK 9</td>
                    <td className="py-3.5 px-4 text-zinc-600">US 9.5 – 10</td>
                    <td className="py-3.5 px-4 text-zinc-600">27.5 cm</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-navy">Size 44</td>
                    <td className="py-3.5 px-4 text-zinc-700">UK 10</td>
                    <td className="py-3.5 px-4 text-zinc-600">US 10.5 – 11</td>
                    <td className="py-3.5 px-4 text-zinc-600">28.5 cm</td>
                  </tr>
                  <tr className="bg-zinc-50/50">
                    <td className="py-3.5 px-4 font-bold text-navy">Size 45</td>
                    <td className="py-3.5 px-4 text-zinc-700">UK 11</td>
                    <td className="py-3.5 px-4 text-zinc-600">US 11.5 – 12</td>
                    <td className="py-3.5 px-4 text-zinc-600">29.5 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SIZING ASSISTANCE CTA */}
          <div className="rounded-2xl border-2 border-navy bg-navy text-white p-8 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-tan">
              Need Personal Advice?
            </span>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold uppercase">
              Still Not Sure About Your Size?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
              Do not guess! Message us on WhatsApp with your height or waist size. We will tell you the exact size that fits best before you pay.
            </p>
            <div className="mt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                <span>Ask Sizing on WhatsApp: {STORE_CONFIG.phoneRaw}</span>
              </a>
            </div>
          </div>
        </div>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
