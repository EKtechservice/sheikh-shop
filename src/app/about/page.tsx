import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  MessageCircle,
  Sparkles,
  Layers,
  Clock,
  Shirt,
  ShoppingBag,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Sheikh Trading Enterprise | Look Good, Pay Less",
  description:
    "Learn about Sheikh Trading Enterprise in Akyem New Tafo: Plain clean colours, Quality & Budget menswear, MoMo orders, and bus dispatch all over Ghana.",
};

export default function AboutPage() {
  const whatsappUrl =
    "https://wa.me/233593684022?text=" +
    encodeURIComponent(
      "Hello Sheikh Trading Enterprise, I am reaching out from your website. Please show me what sizes and colours are available today."
    );

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 1. Header & Announcement Bar */}
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
              <span className="font-semibold text-navy">About Us</span>
            </nav>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-r from-navy via-navy to-navy-dark text-white py-14 sm:py-20">
          <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-tan shadow-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Sheikh Trading Enterprise
            </span>

            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
              Look Good, Pay Less
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
              Started small in <strong>Akyem New Tafo</strong>, with one simple
              idea: men should not pay too much to look neat.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-green-600/30 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                <span>Message Us on WhatsApp (0593684022)</span>
              </a>

              <Link
                href="/categories"
                className="inline-flex items-center gap-2 rounded-xl bg-white/15 hover:bg-white/25 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all backdrop-blur-xs"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Browse Products</span>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 1: OUR PHILOSOPHY & STORY */}
        <section className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-tan">
                Our Story &amp; Philosophy
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-navy uppercase tracking-tight">
                Plain, Clean Colours That Last
              </h2>

              <p className="mt-4 text-base leading-relaxed text-zinc-700">
                We do not sell plenty design and plenty writing. We sell plain,
                clean colours: <strong>black, white, navy, grey, and beige</strong>.
                Colours that fit everybody, colours that do not fade fast.
              </p>

              <p className="mt-3 text-base leading-relaxed text-zinc-700">
                Every cloth is checked before we pack it. We check the neck, the
                sewing, the pocket, and the print. If it is not neat, we do not
                sell it.
              </p>

              {/* Quality Checklist */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-zinc-50 border border-zinc-200 p-2.5 text-xs font-semibold text-navy">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Neck Checked</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-zinc-50 border border-zinc-200 p-2.5 text-xs font-semibold text-navy">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Sewing Checked</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-zinc-50 border border-zinc-200 p-2.5 text-xs font-semibold text-navy">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Pocket Checked</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-zinc-50 border border-zinc-200 p-2.5 text-xs font-semibold text-navy">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Print &amp; Finish Checked</span>
                </div>
              </div>
            </div>

            {/* THE 2 LEVELS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Quality Level Card */}
              <div className="rounded-2xl border-2 border-navy bg-gradient-to-b from-navy/5 to-navy/10 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white mb-4 shadow-xs">
                    <Layers className="h-6 w-6 text-tan" />
                  </div>
                  <span className="inline-block rounded-full bg-navy px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Level 1
                  </span>
                  <h3 className="mt-3 text-xl font-extrabold uppercase text-navy">
                    Quality Level
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                    For men who want thick cloth that will last. Premium heavyweight
                    fabric, reinforced stitching, and long-lasting durability.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-navy/15 text-xs font-bold text-navy">
                  &bull; Built to last wear after wear
                </div>
              </div>

              {/* Budget Level Card */}
              <div className="rounded-2xl border-2 border-tan bg-gradient-to-b from-tan/10 to-tan/5 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tan text-white mb-4 shadow-xs">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <span className="inline-block rounded-full bg-tan px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Level 2
                  </span>
                  <h3 className="mt-3 text-xl font-extrabold uppercase text-navy">
                    Budget Level
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                    For men who want to look good today, and pay less. Clean,
                    stylish, everyday menswear at the most affordable price.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-tan/30 text-xs font-bold text-navy">
                  &bull; Look neat without spending too much
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT WE SELL */}
        <section className="bg-zinc-50 border-y border-zinc-200 py-14 sm:py-20">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-tan">
                Our Catalogue
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-navy">
                What We Sell
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                Clean basics available in straightforward sizes and classic neutral shades.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Item 1 */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs hover:border-navy hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy uppercase">
                      Quality Shirts
                    </h3>
                    <span className="text-xs font-semibold text-tan">
                      Thick T-shirts &amp; Polos
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">
                  Colours: <strong>Black, white, navy</strong>.
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
                  <span>Sizes:</span>
                  <span className="rounded bg-zinc-100 px-2 py-0.5 font-bold text-navy">
                    L, XL, XXL
                  </span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs hover:border-navy hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy uppercase">
                      Budget Shirts
                    </h3>
                    <span className="text-xs font-semibold text-tan">
                      Plain T-shirts
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">
                  Colours: <strong>Black, white, grey</strong>.
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
                  <span>Sizes:</span>
                  <span className="rounded bg-zinc-100 px-2 py-0.5 font-bold text-navy">
                    L, XL, XXL
                  </span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs hover:border-navy hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy uppercase">
                      Quality Shorts
                    </h3>
                    <span className="text-xs font-semibold text-tan">
                      Thick shorts, above the knee
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">
                  Colours: <strong>Black, grey, navy</strong>.
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
                  <span>Sizes:</span>
                  <span className="rounded bg-zinc-100 px-2 py-0.5 font-bold text-navy">
                    L, XL, XXL
                  </span>
                </div>
              </div>

              {/* Item 4 */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs hover:border-navy hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy uppercase">
                      Budget Shorts
                    </h3>
                    <span className="text-xs font-semibold text-tan">
                      Plain shorts
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">
                  Colours: <strong>Black, grey, navy</strong>.
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
                  <span>Sizes:</span>
                  <span className="rounded bg-zinc-100 px-2 py-0.5 font-bold text-navy">
                    L, XL, XXL
                  </span>
                </div>
              </div>

              {/* Item 5 */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs hover:border-navy hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy uppercase">
                      Joggers
                    </h3>
                    <span className="text-xs font-semibold text-tan">
                      Comfort Fit Joggers
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">
                  Colours: <strong>Black joggers only</strong>.
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
                  <span>Sizes:</span>
                  <span className="rounded bg-zinc-100 px-2 py-0.5 font-bold text-navy">
                    L, XL, XXL
                  </span>
                </div>
              </div>

              {/* Item 6 */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs hover:border-navy hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy font-bold">
                    6
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy uppercase">
                      Slides
                    </h3>
                    <span className="text-xs font-semibold text-tan">
                      Comfort Daily Slides
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">
                  Colours: <strong>Black slides only</strong>.
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
                  <span>Sizes:</span>
                  <span className="rounded bg-zinc-100 px-2 py-0.5 font-bold text-navy">
                    42 to 45
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Sizing Notice Banner */}
            <div className="mt-8 rounded-2xl bg-amber-50 border border-amber-200 p-5 text-center">
              <p className="text-sm font-semibold text-amber-900">
                ⚡ <strong>Notice:</strong> Sizes sell fast in <strong>XL</strong> and <strong>XXL</strong>. Message us first on WhatsApp to check your size and price.
              </p>
              <div className="mt-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy underline hover:text-tan"
                >
                  <span>Check available sizes on WhatsApp (0593684022) &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: HOW TO ORDER */}
        <section className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-tan">
              Ordering Process
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-navy">
              How to Order
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Whether you are local near Tafo or across Ghana, getting your clothes is fast and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* OPTION A: NEAR TAFO */}
            <div className="rounded-2xl border-2 border-zinc-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-navy/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy mb-4">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>If You Are Near Tafo</span>
                </div>

                <h3 className="text-xl font-bold uppercase text-navy">
                  Local Pickup or Delivery
                </h3>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                      1
                    </span>
                    <span className="text-sm text-zinc-700">
                      Message us on WhatsApp: <strong>0593684022</strong>.
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                      2
                    </span>
                    <span className="text-sm text-zinc-700">
                      Tell us the <strong>colour</strong>, <strong>size</strong>, and <strong>how many</strong> you want.
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                      3
                    </span>
                    <span className="text-sm text-zinc-700">
                      Come and pick it up in Akyem New Tafo, or we deliver directly to you.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-navy text-white py-3 px-4 text-xs font-bold uppercase tracking-wider hover:bg-navy-dark transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Order for Tafo Pickup</span>
                </a>
              </div>
            </div>

            {/* OPTION B: FAR / ALL OVER GHANA */}
            <div className="rounded-2xl border-2 border-tan bg-gradient-to-b from-tan/5 to-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-tan/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy mb-4">
                  <Truck className="h-3.5 w-3.5" />
                  <span>If You Are Far (All Over Ghana)</span>
                </div>

                <h3 className="text-xl font-bold uppercase text-navy">
                  Nationwide Bus / Driver Delivery
                </h3>

                <ul className="mt-6 space-y-3.5">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                      1
                    </span>
                    <span className="text-sm text-zinc-700">
                      Message us on WhatsApp: <strong>0593684022</strong>.
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                      2
                    </span>
                    <span className="text-sm text-zinc-700">
                      Tell us what you want, your colour and size.
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                      3
                    </span>
                    <span className="text-sm text-zinc-700 font-semibold text-navy">
                      Pay with MoMo first.
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                      4
                    </span>
                    <span className="text-sm text-zinc-700">
                      We pack it neat in a clear bag inside, and a strong black bag outside with your name and town written on it.
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                      5
                    </span>
                    <span className="text-sm text-zinc-700">
                      We send it by bus / driver. We send you a photo of your sealed bag and the driver number.
                    </span>
                  </li>
                </ul>

                {/* MoMo Protection Note */}
                <div className="mt-5 rounded-xl bg-zinc-100 p-3 text-xs text-zinc-600 border border-zinc-200">
                  <span className="font-bold text-navy">Security Note:</span> We do not send far orders before MoMo. This is to protect both of us.
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-200">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                >
                  <MessageCircle className="h-4 w-4 fill-white" />
                  <span>Order via WhatsApp &amp; MoMo</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: WHY BUY FROM US? */}
        <section className="bg-navy py-14 sm:py-20 text-white">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-tan">
                Our Guarantee
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                Why Buy From Us?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-xs text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-tan text-white mb-4">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold uppercase text-white">
                  Checked Before Packing
                </h3>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                  We check every cloth before we sell it. Neck, sewing, pocket, and print are fully inspected.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-xs text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-tan text-white mb-4">
                  <Shirt className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold uppercase text-white">
                  Plain, Clean Colours
                </h3>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                  No plenty writing that will spoil after 1 wash. Timeless plain colours that fit everybody.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-xs text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-tan text-white mb-4">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold uppercase text-white">
                  Weatherproof Packing
                </h3>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                  Neat packaging for far delivery: clear bag inside, strong black bag outside. Rain will not spoil your cloth.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-xs text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-tan text-white mb-4">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold uppercase text-white">
                  Fast WhatsApp Reply
                </h3>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                  Quick and friendly responses on WhatsApp at 0593684022. Tell us your size and we show you what is available.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CONTACT US CTA BANNER */}
        <section className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-200 bg-gradient-to-r from-zinc-50 via-zinc-50 to-amber-50/40 p-8 sm:p-12 shadow-sm text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-tan">
              Ready to Order?
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold uppercase text-navy">
              Message Us Now On WhatsApp
            </h2>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-700">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-green-600" />
                <span>WhatsApp: <strong>0593684022</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-navy" />
                <span>Location: <strong>Akyem New Tafo</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-navy" />
                <span>Delivery: <strong>All over Ghana</strong></span>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-zinc-600">
              Tell us your size. We will show you what is available today!
            </p>

            <div className="mt-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 px-8 text-sm font-bold uppercase tracking-wider shadow-lg shadow-green-600/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5 fill-white" />
                <span>Message 0593684022 on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
