"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { STORE_CONFIG } from "@/data/storeConfig";
import { useCart } from "@/components/CartProvider";
import {
  User,
  Phone,
  MapPin,
  Save,
  CheckCircle2,
  ShoppingBag,
  Truck,
  MessageCircle,
  Ruler,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface CustomerProfile {
  fullName: string;
  phone: string;
  town: string;
  address: string;
  shirtSize: "L" | "XL" | "XXL";
  slideSize: "42" | "43" | "44" | "45";
  preferredLevel: "Quality" | "Budget" | "Both";
}

const STORAGE_KEY = "sheikh_shop_customer_profile_v1";

const DEFAULT_PROFILE: CustomerProfile = {
  fullName: "",
  phone: "",
  town: "Akyem New Tafo",
  address: "",
  shirtSize: "XL",
  slideSize: "43",
  preferredLevel: "Quality",
};

export default function AccountView() {
  const { cartCount } = useCart();
  const [profile, setProfile] = useState<CustomerProfile>(DEFAULT_PROFILE);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load profile from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch {
      // Ignore storage error
    }
    setIsLoaded(true);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    } catch {
      // Ignore storage error
    }
  };

  const whatsappConciergeUrl =
    "https://wa.me/233593684022?text=" +
    encodeURIComponent(
      `Hello Sheikh Trading Enterprise, my name is ${profile.fullName || "Customer"} (WhatsApp: ${profile.phone || "N/A"}). I would like to inquire about today's available stock and sizes.`
    );

  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-zinc-200 bg-gradient-to-r from-zinc-50 via-zinc-50 to-navy/5 p-6 sm:p-8 mb-10 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-navy text-tan shadow-md">
            <User className="h-8 w-8" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-tan">
              Customer Account
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-navy">
              {profile.fullName ? `Welcome, ${profile.fullName}` : "My Account & Orders"}
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Manage your delivery details, preferred sizes, and direct WhatsApp contact.
            </p>
          </div>
        </div>

        {/* Quick Cart Status */}
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-navy-dark transition-all"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Bag ({cartCount})</span>
          </Link>
          <a
            href={whatsappConciergeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>WhatsApp Support</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* LEFT COLUMN: Customer Profile Form (Cols 1-7) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
              <div>
                <h2 className="text-lg font-bold uppercase text-navy">
                  Saved Details &amp; Sizing Preferences
                </h2>
                <p className="text-xs text-text-muted mt-0.5">
                  These details will automatically pre-fill your checkout in the shopping bag.
                </p>
              </div>
            </div>

            {isSaved && (
              <div className="mb-6 flex items-center gap-2.5 rounded-xl bg-green-50 p-4 text-xs font-bold text-green-800 border border-green-200 animate-pop-check">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                <span>Your profile details have been saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-navy block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400" />
                  <input
                    type="text"
                    required
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                    placeholder="e.g. Kwame Mensah"
                    className="w-full rounded-xl border border-zinc-300 bg-white pl-10 pr-4 py-2.5 text-sm text-navy placeholder:text-zinc-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  />
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-navy block mb-1">
                  WhatsApp / Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400" />
                  <input
                    type="tel"
                    required
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    placeholder="e.g. 059 368 4022"
                    className="w-full rounded-xl border border-zinc-300 bg-white pl-10 pr-4 py-2.5 text-sm text-navy placeholder:text-zinc-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  />
                </div>
              </div>

              {/* Town in Ghana */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-navy block mb-1">
                  Delivery Town / Region in Ghana
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400" />
                  <input
                    type="text"
                    required
                    value={profile.town}
                    onChange={(e) =>
                      setProfile({ ...profile, town: e.target.value })
                    }
                    placeholder="e.g. Akyem New Tafo, Accra, Kumasi..."
                    className="w-full rounded-xl border border-zinc-300 bg-white pl-10 pr-4 py-2.5 text-sm text-navy placeholder:text-zinc-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  />
                </div>
              </div>

              {/* Street Address / Landmark */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-navy block mb-1">
                  Street Address or Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                  placeholder="e.g. Near Total Filling Station"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-zinc-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                />
              </div>

              {/* Sizing Preferences */}
              <div className="border-t border-zinc-200 pt-5">
                <span className="text-xs font-bold uppercase tracking-wider text-tan block mb-3">
                  My Fit Preferences
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-navy block mb-1">
                      Preferred Shirt / Short Size
                    </label>
                    <select
                      value={profile.shirtSize}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          shirtSize: e.target.value as any,
                        })
                      }
                      className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs font-bold text-navy focus:border-navy focus:outline-none"
                    >
                      <option value="L">L (Large - 40/42&quot;)</option>
                      <option value="XL">XL (Extra Large - 44/46&quot;)</option>
                      <option value="XXL">XXL (Double XL - 48/50&quot;)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-navy block mb-1">
                      Preferred Slide Size
                    </label>
                    <select
                      value={profile.slideSize}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          slideSize: e.target.value as any,
                        })
                      }
                      className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs font-bold text-navy focus:border-navy focus:outline-none"
                    >
                      <option value="42">Size 42 (UK 8)</option>
                      <option value="43">Size 43 (UK 9)</option>
                      <option value="44">Size 44 (UK 10)</option>
                      <option value="45">Size 45 (UK 11)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Save Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-navy-dark transition-all"
                >
                  <Save className="h-4 w-4" />
                  <span>Save My Details</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Quick Actions & Hub (Cols 8-12) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Hub Card */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-tan">
              Account Quick Hub
            </h3>

            <div className="space-y-2.5">
              <Link
                href="/cart"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-zinc-200 hover:border-navy transition-all"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-navy" />
                  <span className="text-xs font-bold text-navy">View Shopping Bag</span>
                </div>
                <span className="text-xs font-bold text-navy bg-zinc-100 rounded-full px-2 py-0.5">
                  {cartCount} items
                </span>
              </Link>

              <Link
                href="/support/track-order"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-zinc-200 hover:border-navy transition-all"
              >
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-navy" />
                  <span className="text-xs font-bold text-navy">Track Bus / Courier Parcel</span>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </Link>

              <Link
                href="/support/size-guide"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-zinc-200 hover:border-navy transition-all"
              >
                <div className="flex items-center gap-3">
                  <Ruler className="h-5 w-5 text-navy" />
                  <span className="text-xs font-bold text-navy">Men&apos;s Size Chart</span>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </Link>
            </div>
          </div>

          {/* WhatsApp Direct Concierge Card */}
          <div className="rounded-2xl border-2 border-[#25D366] bg-gradient-to-b from-green-50/50 to-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-green-700 font-bold text-xs uppercase tracking-wider mb-2">
              <MessageCircle className="h-4 w-4 fill-green-600 text-white" />
              <span>Direct WhatsApp Concierge</span>
            </div>
            <h4 className="text-lg font-bold text-navy">
              Speak with Store Owner
            </h4>
            <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
              Need personal sizing confirmation, bulk wholesale prices, or customized delivery in Akyem New Tafo or elsewhere in Ghana?
            </p>
            <div className="mt-4">
              <a
                href={whatsappConciergeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 text-xs font-bold uppercase tracking-wider shadow-md transition-all"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                <span>Chat Now ({STORE_CONFIG.phoneRaw})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
