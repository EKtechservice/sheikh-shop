import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Newsletter from "@/components/Newsletter";
import { ChevronRight, Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Sheikh's Shop Customer Care",
  description:
    "Get in touch with Sheikh's Shop for customer support, store pickup, preorder tracking, and sizing assistance.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <AnnouncementBar />

      <main className="flex-1">
        <div className="border-b border-zinc-100 bg-zinc-50/70 py-3">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
              <Link href="/" className="hover:text-navy transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <span className="font-semibold text-navy">Contact Us</span>
            </nav>
          </div>
        </div>

        <section className="bg-navy py-12 text-white sm:py-16">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-tan">
              We&apos;re Here to Help
            </span>
            <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-zinc-300">
              Have a question about an order, preorders, custom sizing, or store pickup? Our dedicated customer care team is ready to assist you.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold uppercase text-navy">Customer Support</h2>
                <p className="mt-2 text-sm text-text-muted">
                  Reach out through any of our channels or visit our showroom.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-navy">Phone / WhatsApp</h3>
                    <p className="mt-1 text-sm font-semibold text-zinc-800">+233 59 368 4022 (0593684022)</p>
                    <p className="text-xs text-text-muted">Available Mon–Sat: 8:00 AM – 8:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-navy">Email Support</h3>
                    <p className="mt-1 text-sm text-zinc-600">orders@sheikhsshop.com</p>
                    <p className="text-xs text-text-muted">We reply within 2-4 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-navy">Store &amp; Pickup Location</h3>
                    <p className="mt-1 text-sm text-zinc-600">Sheikh&apos;s Shop Flagship Store, Accra, Ghana</p>
                    <p className="text-xs text-text-muted">Free online order pickup available daily</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-navy">Business Hours</h3>
                    <p className="mt-1 text-sm text-zinc-600">Monday – Saturday: 8:00 AM – 8:00 PM</p>
                    <p className="text-xs text-text-muted">Sunday: 1:00 PM – 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
