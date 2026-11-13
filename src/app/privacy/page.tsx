import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { STORE_CONFIG } from "@/data/storeConfig";
import { ChevronRight, ShieldCheck, Lock, EyeOff, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Sheikh Trading Enterprise",
  description:
    "Read the Privacy Policy of Sheikh Trading Enterprise. How we protect your order details, phone number, and delivery data in Ghana.",
};

export default function PrivacyPage() {
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
              <span className="font-semibold text-navy">Privacy Policy</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-navy via-navy to-navy-dark py-12 text-white sm:py-16">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-tan">
              <ShieldCheck className="h-3.5 w-3.5" />
              Customer Privacy &amp; Data Protection
            </span>
            <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              Privacy Policy
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-zinc-300">
              Clear, honest guidelines on how Sheikh Trading Enterprise handles your personal information.
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-8 text-zinc-700 text-sm leading-relaxed">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              <h2 className="text-xl font-bold uppercase text-navy flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-tan" />
                <span>1. What Information We Collect</span>
              </h2>
              <p className="mt-3">
                When you order from Sheikh Trading Enterprise (via our website or WhatsApp), we collect only the necessary details required to deliver your clothes:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Your full name (written on your sealed parcel)</li>
                <li>Your phone number / WhatsApp number (to confirm sizes and share driver info)</li>
                <li>Your town or delivery address in Ghana</li>
                <li>The items, colours, and sizes you ordered</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              <h2 className="text-xl font-bold uppercase text-navy flex items-center gap-2">
                <EyeOff className="h-5 w-5 text-tan" />
                <span>2. How We Use Your Information</span>
              </h2>
              <p className="mt-3">
                We use your information strictly to:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Communicate with you regarding your size, colour, and stock on WhatsApp.</li>
                <li>Coordinate parcel delivery with local drivers or commercial buses.</li>
                <li>Send you dispatch confirmation photos and driver phone numbers.</li>
                <li>Provide customer care and resolve any sizing questions or exchanges.</li>
              </ul>
              <p className="mt-3 font-semibold text-navy">
                We never sell, rent, or share your phone number with advertisers or marketing companies.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              <h2 className="text-xl font-bold uppercase text-navy flex items-center gap-2">
                <Lock className="h-5 w-5 text-tan" />
                <span>3. Payment Security (MoMo)</span>
              </h2>
              <p className="mt-3">
                Mobile Money payments (MTN MoMo / Telecel Cash) are handled through your own mobile phone on the official carrier network.
              </p>
              <p className="mt-2 text-sale-red font-semibold">
                ⚠️ Notice: We will NEVER ask you for your Mobile Money PIN. Keep your PIN private at all times.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              <h2 className="text-xl font-bold uppercase text-navy">
                4. Contact for Privacy Questions
              </h2>
              <p className="mt-3">
                If you have questions about how your order information is handled, reach out directly to our store manager:
              </p>
              <p className="mt-2 font-bold text-navy">
                WhatsApp: {STORE_CONFIG.phoneDisplay} ({STORE_CONFIG.phoneRaw})<br />
                Location: Akyem New Tafo, Eastern Region, Ghana
              </p>
            </div>
          </div>
        </div>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
