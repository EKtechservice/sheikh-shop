"use client";

import React, { useState } from "react";
import { STORE_CONFIG } from "@/data/storeConfig";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MessageCircle,
  AlertCircle,
} from "lucide-react";

export default function TrackOrderForm() {
  const [orderQuery, setOrderQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setHasSearched(true);
    }
  };

  const whatsappInquireUrl =
    "https://wa.me/233593684022?text=" +
    encodeURIComponent(
      `Hello Sheikh Trading Enterprise, I want to track my order. My phone number / reference is: ${orderQuery || "Customer"}`
    );

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Input Box */}
      <form onSubmit={handleTrack} className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
        <label className="text-xs font-bold uppercase tracking-wider text-navy block mb-2">
          Enter Your Phone Number or Order Reference
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              required
              value={orderQuery}
              onChange={(e) => {
                setOrderQuery(e.target.value);
                setHasSearched(false);
              }}
              placeholder="e.g. 059 368 4022 or Name"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3.5 text-sm text-navy placeholder:text-zinc-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-navy-dark transition-all"
          >
            <Search className="h-4 w-4" />
            <span>Track Order</span>
          </button>
        </div>
        <p className="mt-2 text-[11px] text-text-muted">
          Use the same phone number or name you gave during your WhatsApp order or checkout.
        </p>
      </form>

      {/* TRACKING RESULT PREVIEW */}
      {hasSearched && (
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm transition-all animate-pop-check">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-tan">
                Order Tracking Status
              </span>
              <h3 className="text-lg font-bold text-navy mt-0.5">
                Order for: <span className="text-emerald-700">{orderQuery}</span>
              </h3>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold uppercase">
              Active Order
            </span>
          </div>

          {/* Stepper Timeline */}
          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">1. MoMo Payment Confirmed</p>
                <p className="text-xs text-zinc-500 mt-0.5">Payment received and order verified by store manager.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">2. Quality Inspected &amp; Waterproof Packed</p>
                <p className="text-xs text-zinc-500 mt-0.5">Cloth neck, sewing, pocket checked. Sealed in dual protective bag.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-white shadow-xs">
                <Truck className="h-5 w-5 text-tan" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">3. Dispatched to Bus / Driver</p>
                <p className="text-xs text-zinc-500 mt-0.5">Parcel handed over to driver for transit to your town.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-zinc-500">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-600">4. Ready for Collection / Delivery</p>
                <p className="text-xs text-zinc-400 mt-0.5">Pick up at local station or receive driver drop-off.</p>
              </div>
            </div>
          </div>

          {/* Action on WhatsApp */}
          <div className="mt-8 pt-6 border-t border-zinc-200 bg-zinc-50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase text-navy">
                  Need Waybill Photo or Driver Phone?
                </p>
                <p className="text-xs text-zinc-600 mt-0.5">
                  We send photos of your sealed bag and the driver number directly on WhatsApp.
                </p>
              </div>

              <a
                href={whatsappInquireUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-3 text-xs font-bold uppercase tracking-wider shadow-md transition-all"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                <span>Ask Driver Contact on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Dispatch Policy Reminder */}
      <div className="mt-8 rounded-2xl bg-zinc-50 border border-zinc-200 p-6 text-xs text-zinc-600 space-y-2">
        <p className="font-bold text-navy uppercase text-[11px] flex items-center gap-1.5">
          <AlertCircle className="h-3.5 w-3.5 text-navy" />
          <span>How Our Dispatch Notification Works:</span>
        </p>
        <p>
          &bull; <strong>Local Orders (Akyem New Tafo):</strong> Ready for pickup immediately or delivered the same day.
        </p>
        <p>
          &bull; <strong>Far Orders (All over Ghana):</strong> Sent by bus. As soon as the driver loads your parcel, we send you a photo of your bag with your name and town written on it, along with the driver&apos;s phone number on WhatsApp.
        </p>
      </div>
    </div>
  );
}
