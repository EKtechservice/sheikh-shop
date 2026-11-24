"use client";

import React, { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { STORE_CONFIG } from "@/data/storeConfig";

interface FaqItem {
  question: string;
  answer: string;
  category: "ordering" | "products" | "delivery" | "payment";
}

const FAQS: readonly FaqItem[] = [
  {
    category: "ordering",
    question: "Where is Sheikh Trading Enterprise located?",
    answer:
      "We are proudly based in Akyem New Tafo, Eastern Region, Ghana. If you are near Tafo, you can come pick up your order directly or we can deliver to your doorstep.",
  },
  {
    category: "ordering",
    question: "How do I place an order?",
    answer:
      "You can place an order directly on this website through your Shopping Bag, which connects to our WhatsApp (0593684022). Alternatively, you can message us directly on WhatsApp with the item, colour, and size (L, XL, XXL) you want.",
  },
  {
    category: "products",
    question: "What is the difference between Quality and Budget levels?",
    answer:
      "Quality Level is for men who want thick, heavyweight cloth that will last a very long time through repeated washes. Budget Level is for men who want to look neat and clean today at the most affordable price point.",
  },
  {
    category: "products",
    question: "Why do you only sell plain, neutral colours?",
    answer:
      "We do not sell plenty designs or loud writing because printed graphics often peel, fade, or spoil after a few washes. We stick to classic, timeless colours—Black, White, Navy, Grey, and Beige—that look sophisticated, match with any trousers, and stay sharp.",
  },
  {
    category: "products",
    question: "Which sizes are available, and do you have my size in stock?",
    answer:
      "Our apparel collections (shirts, polo shirts, shorts, boxers, and joggers) are available in sizes S, M, L, XL, 2XL, 3XL, and 4XL. Footwear and slides are available in sizes 40 to 45. Please note that popular sizes sell out fast! We advise messaging us on WhatsApp to confirm real-time availability before making payment.",
  },
  {
    category: "payment",
    question: "How do I pay for my order?",
    answer:
      "We accept Mobile Money (MTN MoMo, Vodafone Cash / Telecel Cash). Once we confirm your order details and items on WhatsApp, we provide our verified merchant MoMo number for payment.",
  },
  {
    category: "delivery",
    question: "Why do you require MoMo payment before far delivery?",
    answer:
      "We send all far orders via commercial bus drivers and courier lines from Tafo. Buses require parcel fees to be settled upon loading, and drivers do not handle cash-on-delivery collection. Prepayment via MoMo protects both of us. As soon as your parcel is handed over, we send you a clear photo of your sealed parcel and the driver's phone number.",
  },
  {
    category: "delivery",
    question: "How is my cloth packaged for delivery?",
    answer:
      "Every order is double-packed for complete waterproofing: first in a clean, transparent inner bag, and then sealed in a strong, heavy-duty black security courier bag with your name and delivery town clearly marked. Even if it rains heavily during transit, your clothes will arrive 100% dry and spotless.",
  },
  {
    category: "delivery",
    question: "How long does nationwide delivery take across Ghana?",
    answer:
      "Most orders dispatched by bus arrive within 24 to 48 hours depending on your town or region (Accra, Kumasi, Takoradi, Tamale, Sunyani, Koforidua, Cape Coast, etc.). For customers in Akyem New Tafo, same-day pickup or drop-off is available.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [filter, setFilter] = useState<string>("all");

  const filteredFaqs =
    filter === "all" ? FAQS : FAQS.filter((f) => f.category === filter);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const whatsappUrl = "https://wa.me/message/PSFB74E34YBZJ1";

  return (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {[
          { id: "all", label: "All Questions" },
          { id: "ordering", label: "Ordering" },
          { id: "products", label: "Products & Sizes" },
          { id: "delivery", label: "Delivery & Packing" },
          { id: "payment", label: "MoMo & Payment" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setFilter(tab.id);
              setOpenIndex(null);
            }}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              filter === tab.id
                ? "bg-navy text-white shadow-xs"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3 max-w-3xl mx-auto">
        {filteredFaqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.question}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-navy bg-white shadow-sm"
                  : "border-zinc-200 bg-zinc-50/60 hover:border-zinc-300"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-bold text-navy pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-navy shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-zinc-600 border-t border-zinc-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions CTA */}
      <div className="mt-12 rounded-2xl bg-zinc-50 border border-zinc-200 p-8 text-center max-w-xl mx-auto">
        <h3 className="text-base font-bold uppercase text-navy">
          Still Have a Question?
        </h3>
        <p className="mt-1 text-xs text-text-muted">
          Our team in Akyem New Tafo is active on WhatsApp and replies quickly.
        </p>
        <div className="mt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:shadow-lg"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>Chat on WhatsApp: {STORE_CONFIG.phoneRaw}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
