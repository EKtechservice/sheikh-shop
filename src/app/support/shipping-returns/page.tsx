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
  Truck,
  Package,
  ShieldCheck,
  RefreshCw,
  Clock,
  MessageCircle,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Returns Policy | Sheikh Trading Enterprise",
  description:
    "Learn about our nationwide bus and driver delivery across Ghana, our weatherproof packaging, and our replacement policy at Sheikh Trading Enterprise.",
};

export default function ShippingReturnsPage() {
  const whatsappUrl =
    "https://wa.me/233593684022?text=" +
    encodeURIComponent(
      "Hello Sheikh Trading Enterprise, I have a question about shipping/delivery to my town."
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
              <span className="font-semibold text-navy">Shipping &amp; Returns</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-navy via-navy to-navy-dark py-12 text-white sm:py-16">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-tan">
              <Truck className="h-3.5 w-3.5" />
              Reliable Nationwide Dispatch
            </span>
            <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              Shipping &amp; Returns
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-zinc-300">
              How we pack, ship, and deliver your menswear safely across Ghana from our base in Akyem New Tafo.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* DELIVERY METHODS & TIMELINES */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-tan">
                  Delivery Guidelines
                </span>
                <h2 className="mt-2 text-2xl font-bold uppercase text-navy">
                  How We Deliver Your Clothes
                </h2>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  Every order is treated with utmost care. Depending on your location, here is how we get your parcel to you:
                </p>
              </div>

              {/* Near Tafo */}
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
                <div className="flex items-center gap-2 text-navy font-bold text-base mb-2">
                  <MapPin className="h-5 w-5 text-tan" />
                  <span>1. Local Orders (Akyem New Tafo &amp; Surroundings)</span>
                </div>
                <ul className="text-xs text-zinc-600 space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Free Store Pickup:</strong> Message us, confirm your sizes, and pick up your order directly from our store in Tafo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Local Drop-off:</strong> Same-day doorstep delivery within Tafo town.</span>
                  </li>
                </ul>
              </div>

              {/* Far Orders / Nationwide */}
              <div className="rounded-2xl border border-navy/30 bg-navy/5 p-6">
                <div className="flex items-center gap-2 text-navy font-bold text-base mb-2">
                  <Truck className="h-5 w-5 text-navy" />
                  <span>2. Nationwide Delivery (All Other Towns &amp; Regions)</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                  We ship to Accra, Kumasi, Takoradi, Tamale, Sunyani, Cape Coast, Koforidua, Ho, Tema, and all towns across Ghana.
                </p>
                <ul className="text-xs text-zinc-700 space-y-2.5 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-navy shrink-0 mt-0.5" />
                    <span><strong>Timeline:</strong> Typically <strong>24 to 48 hours</strong> via express bus/courier vans.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-navy shrink-0 mt-0.5" />
                    <span><strong>Proof of Dispatch:</strong> As soon as your parcel is handed to the bus driver, we send you a <strong>photo of your sealed parcel</strong> and the <strong>driver&apos;s phone number</strong> on WhatsApp.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Payment Terms:</strong> For far orders, full payment via MoMo is required before packing and dispatch. We do not dispatch far parcels before payment to protect both parties.</span>
                  </li>
                </ul>
              </div>

              {/* Packaging Standard */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs">
                <div className="flex items-center gap-2 text-navy font-bold text-base mb-2">
                  <Package className="h-5 w-5 text-tan" />
                  <span>Our Weatherproof Packaging Standard</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Rain will never spoil your cloth. Every single order is packed with dual-layer protection:
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-zinc-100 p-3">
                    <p className="font-bold text-navy">Layer 1: Inner Bag</p>
                    <p className="mt-1 text-zinc-600">Clean, dust-proof clear plastic sleeve protecting the fabric.</p>
                  </div>
                  <div className="rounded-xl bg-zinc-100 p-3">
                    <p className="font-bold text-navy">Layer 2: Security Bag</p>
                    <p className="mt-1 text-zinc-600">Heavy-duty black waterproof mailing bag with your name &amp; town.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RETURNS & EXCHANGES POLICY */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-tan">
                  Customer Satisfaction
                </span>
                <h2 className="mt-2 text-2xl font-bold uppercase text-navy">
                  Returns &amp; Replacement Policy
                </h2>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  We stand by the quality of everything we sell. Here is how our return and exchange policy works:
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-navy">
                      100% Pre-Dispatch Quality Check
                    </h3>
                    <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                      Before any cloth is folded and packed, our team inspects the collar neck, sewing seams, pockets, and fabric print. If it is not neat, it does not leave our store.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-zinc-200 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tan/20 text-navy">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-navy">
                      Defect or Wrong Item Replacement
                    </h3>
                    <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                      If you receive a damaged cloth or an incorrect size caused by an error on our end, notify us on WhatsApp (<strong>0593684022</strong>) within <strong>48 hours</strong> of receiving the parcel. We will immediately replace it or swap it for the right size.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-zinc-200 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-navy">
                      Return Conditions
                    </h3>
                    <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                      To qualify for an exchange, clothes must be unworn, unwashed, and in the original clean packaging they arrived in.
                    </p>
                  </div>
                </div>
              </div>

              {/* Need Help CTA */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs text-center">
                <h3 className="text-sm font-bold uppercase text-navy">
                  Have a Question About Delivery?
                </h3>
                <p className="mt-1 text-xs text-text-muted">
                  Message us with your town name and we will confirm the bus station and delivery cost.
                </p>
                <div className="mt-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:shadow-lg"
                  >
                    <MessageCircle className="h-4 w-4 fill-white" />
                    <span>WhatsApp Inquiry ({STORE_CONFIG.phoneRaw})</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
