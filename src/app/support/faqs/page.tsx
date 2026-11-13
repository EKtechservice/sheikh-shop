import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/FaqAccordion";
import Newsletter from "@/components/Newsletter";
import { ChevronRight, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs) | Sheikh Trading Enterprise",
  description:
    "Find answers to common questions about ordering, sizing, quality vs budget menswear, MoMo payment, and nationwide bus delivery from Sheikh Trading Enterprise.",
};

export default function FaqsPage() {
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
              <span className="font-semibold text-navy">Help &amp; FAQs</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-navy via-navy to-navy-dark py-12 text-white sm:py-16">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-tan">
              <HelpCircle className="h-3.5 w-3.5" />
              Customer Support Center
            </span>
            <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-zinc-300">
              Everything you need to know about our products, sizing, MoMo payments, and fast delivery across Ghana.
            </p>
          </div>
        </section>

        {/* FAQs Content */}
        <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
          <FaqAccordion />
        </div>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
