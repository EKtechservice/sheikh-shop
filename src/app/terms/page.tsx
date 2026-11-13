import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { STORE_CONFIG } from "@/data/storeConfig";
import { ChevronRight, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Sheikh Trading Enterprise",
  description:
    "Terms of service for Sheikh Trading Enterprise. Ordering, MoMo payments, delivery terms, and exchanges across Ghana.",
};

export default function TermsPage() {
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
              <span className="font-semibold text-navy">Terms of Service</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-navy via-navy to-navy-dark py-12 text-white sm:py-16">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-tan">
              <FileText className="h-3.5 w-3.5" />
              Fair &amp; Transparent Terms
            </span>
            <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              Terms of Service
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-zinc-300">
              Straightforward guidelines for orders, MoMo payments, bus dispatch, and customer satisfaction.
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-8 text-zinc-700 text-sm leading-relaxed">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              <h2 className="text-xl font-bold uppercase text-navy">
                1. Ordering &amp; Stock Availability
              </h2>
              <p className="mt-3">
                All menswear orders are confirmed via WhatsApp (<strong>{STORE_CONFIG.phoneRaw}</strong>) or through this website. Because popular sizes like <strong>XL and XXL</strong> sell fast, availability is confirmed at the time of your message.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              <h2 className="text-xl font-bold uppercase text-navy">
                2. Payment &amp; Dispatch Policy
              </h2>
              <p className="mt-3">
                &bull; <strong>Local Orders (Near Tafo):</strong> Payment can be made via MoMo or cash upon collection or local drop-off.<br />
                &bull; <strong>Far Orders (All over Ghana):</strong> Full MoMo payment is required prior to packing and bus dispatch. We do not dispatch far parcels before payment in order to protect both buyer and seller.
              </p>
              <p className="mt-2 text-xs text-text-muted">
                Upon bus dispatch, we provide you with a photo of your sealed parcel and the driver&apos;s phone number.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              <h2 className="text-xl font-bold uppercase text-navy">
                3. Quality Inspection &amp; Exchanges
              </h2>
              <p className="mt-3">
                We check every cloth before packing: neck, sewing, pocket, and print. If you receive an incorrect item or factory defect, notify us on WhatsApp within <strong>48 hours</strong> of receipt for an immediate swap.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              <h2 className="text-xl font-bold uppercase text-navy">
                4. Contact &amp; Business Address
              </h2>
              <p className="mt-3">
                <strong>Sheikh Trading Enterprise</strong><br />
                Akyem New Tafo, Eastern Region, Ghana<br />
                WhatsApp: <strong>{STORE_CONFIG.phoneDisplay}</strong> ({STORE_CONFIG.phoneRaw})
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
