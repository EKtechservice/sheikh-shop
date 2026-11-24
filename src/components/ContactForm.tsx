"use client";

import React, { useState } from "react";
import { STORE_CONFIG } from "@/data/storeConfig";
import { Send, CheckCircle2, MessageCircle } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [topic, setTopic] = useState("Product Inquiry / Sizing");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    window.open(STORE_CONFIG.whatsappDirectLink || "https://wa.me/message/PSFB74E34YBZJ1", "_blank", "noopener,noreferrer");
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-xl font-bold uppercase text-navy">Message Received!</h3>
        <p className="mt-2 text-sm text-text-muted leading-relaxed">
          Thank you, <strong>{name}</strong>. Our customer care team will contact you via {contact} within 2–4 hours.
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={handleWhatsAppDirect}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:shadow-lg cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>Chat on WhatsApp Directly</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-8 shadow-sm">
      <h3 className="text-xl font-bold uppercase text-navy">Send Us a Message</h3>
      <p className="mt-1 text-xs text-text-muted">
        Fill out the form below or chat with us directly on WhatsApp.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-navy block mb-1">
            Your Name <span className="text-sale-red">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Kwame Mensah"
            className="w-full h-11 sm:h-10 rounded-lg border border-zinc-300 bg-white px-4 text-base sm:text-sm text-navy placeholder:text-zinc-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-navy block mb-1">
            Phone / Email <span className="text-sale-red">*</span>
          </label>
          <input
            type="text"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="e.g. 0500000000 or name@gmail.com"
            className="w-full h-11 sm:h-10 rounded-lg border border-zinc-300 bg-white px-4 text-base sm:text-sm text-navy placeholder:text-zinc-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-navy block mb-1">
            Topic
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full h-11 sm:h-10 rounded-lg border border-zinc-300 bg-white px-4 text-base sm:text-sm text-navy focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
          >
            <option>Product Inquiry / Sizing</option>
            <option>Preorder Gadgets Assistance</option>
            <option>Free Store Pickup Question</option>
            <option>Nationwide Delivery Status</option>
            <option>Other Question</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-navy block mb-1">
            Message <span className="text-sale-red">*</span>
          </label>
          <textarea
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help you today?"
            className="w-full rounded-lg border border-zinc-300 bg-white p-4 text-base sm:text-sm text-navy placeholder:text-zinc-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy resize-y"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-navy py-3 px-6 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-navy-dark hover:shadow-lg cursor-pointer"
          >
            <Send className="h-4 w-4" />
            <span>Send Message</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppDirect}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] py-3 px-6 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>WhatsApp</span>
          </button>
        </div>
      </form>
    </div>
  );
}
