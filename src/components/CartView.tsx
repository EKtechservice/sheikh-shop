"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/utils";
import {
  buildWhatsAppOrderLink,
  STORE_CONFIG,
  type CustomerOrderDetails,
} from "@/data/storeConfig";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Store,
  ShieldCheck,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

export default function CartView() {
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } =
    useCart();

  // Checkout Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = deliveryMethod === "delivery" ? 5.0 : 0.0;
  const grandTotal = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (items.length === 0) {
      setErrorMsg("Your cart is empty. Please add items before placing an order.");
      return;
    }

    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name so the store owner knows who the order is for.");
      return;
    }

    if (!phone.trim()) {
      setErrorMsg("Please enter your WhatsApp or phone number.");
      return;
    }

    if (deliveryMethod === "delivery" && !deliveryAddress.trim()) {
      setErrorMsg("Please provide your delivery address or town in Ghana.");
      return;
    }

    setIsSubmitting(true);

    const payload: CustomerOrderDetails = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      deliveryMethod,
      deliveryAddress: deliveryMethod === "delivery" ? deliveryAddress.trim() : undefined,
      notes: notes.trim() || undefined,
      items: items.map((item) => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        size: item.selectedSize,
      })),
      totalPrice: subtotal,
      deliveryFee,
    };

    const whatsappLink = buildWhatsAppOrderLink(payload);

    // Open WhatsApp in a new tab/window
    window.open(whatsappLink, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:py-20 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h2 className="mt-6 text-2xl font-extrabold uppercase tracking-tight text-navy">
          Your Shopping Bag is Empty
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Looks like you haven&apos;t added any menswear essentials yet. Explore
          our curated categories to get started.
        </p>
        <div className="mt-8">
          <Link
            href="/categories"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-navy px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-navy-dark hover:shadow-xl hover:-translate-y-0.5"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-content px-4 py-6 sm:py-8 sm:px-6 lg:px-8 pb-safe">
      {/* Header title */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-navy">
            Shopping Bag
          </h1>
          <p className="mt-1 text-xs text-text-muted">
            You have <strong className="text-navy">{items.length}</strong> unique{" "}
            {items.length === 1 ? "product" : "products"} in your bag.
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="mt-3 sm:mt-0 inline-flex min-h-[44px] sm:min-h-0 items-center text-xs font-semibold text-zinc-400 hover:text-sale-red transition-colors cursor-pointer"
        >
          Clear Entire Bag
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {/* LEFT COLUMN: Items List (Cols 1-7) */}
        <div className="lg:col-span-7 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedSize || "default"}`}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs transition-all hover:border-navy/40 hover:shadow-md"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-50 border border-zinc-100 p-2"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-contain p-1"
                  />
                </Link>

                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-tan">
                    {item.product.categoryName || "Menswear"}
                  </span>
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="text-sm font-bold text-navy hover:text-tan transition-colors"
                  >
                    {item.product.name}
                  </Link>
                  {item.selectedSize && (
                    <span className="mt-0.5 inline-block text-xs text-text-muted">
                      Option: <strong className="text-navy">{item.selectedSize}</strong>
                    </span>
                  )}
                  <span className="mt-1 text-xs font-semibold text-navy">
                    {formatPrice(item.product.price)} each
                  </span>
                </div>
              </div>

              {/* Quantity Controls & Item Total (Touch Optimized) */}
              <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4 sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-100">
                {/* Stepper with >= 44x44px touch targets */}
                <div className="flex items-center rounded-xl border border-zinc-300 bg-white px-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.quantity - 1,
                        item.selectedSize
                      )
                    }
                    className="flex min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px] items-center justify-center text-zinc-600 hover:text-navy transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-navy">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.quantity + 1,
                        item.selectedSize
                      )
                    }
                    className="flex min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px] items-center justify-center text-zinc-600 hover:text-navy transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <p className="text-sm font-extrabold text-navy">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() =>
                    removeFromCart(item.product.id, item.selectedSize)
                  }
                  className="flex min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px] items-center justify-center text-zinc-400 hover:text-sale-red transition-colors"
                  aria-label={`Remove ${item.product.name} from cart`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Continue Shopping Link */}
          <div className="pt-2">
            <Link
              href="/categories"
              className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-navy transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping for More Items</span>
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary & WhatsApp Checkout (Cols 8-12) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5 sm:p-6 shadow-sm">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-navy border-b border-zinc-200 pb-3">
              Order Details &amp; Checkout
            </h2>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-sale-red" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="mt-5 space-y-4">
              {/* Customer Name */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-navy block mb-1">
                  Your Full Name <span className="text-sale-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Samuel Mensah"
                  className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-3.5 text-base sm:text-sm text-navy placeholder:text-zinc-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                />
              </div>

              {/* Customer WhatsApp / Phone */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-navy block mb-1">
                  WhatsApp / Phone Number <span className="text-sale-red">*</span>
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 050 123 4567 or +233..."
                  className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-3.5 text-base sm:text-sm text-navy placeholder:text-zinc-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                />
              </div>

              {/* Delivery Option Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-navy block mb-1">
                  Delivery Method
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("pickup")}
                    className={`flex flex-col items-center justify-center min-h-[64px] p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      deliveryMethod === "pickup"
                        ? "border-navy bg-navy text-white shadow-xs"
                        : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
                    }`}
                  >
                    <Store className="h-5 w-5 mb-1" />
                    <span className="text-xs font-bold">Store Pickup</span>
                    <span className="text-[10px] opacity-80">FREE in Accra</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("delivery")}
                    className={`flex flex-col items-center justify-center min-h-[64px] p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      deliveryMethod === "delivery"
                        ? "border-navy bg-navy text-white shadow-xs"
                        : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
                    }`}
                  >
                    <Truck className="h-5 w-5 mb-1" />
                    <span className="text-xs font-bold">Nationwide</span>
                    <span className="text-[10px] opacity-80">+$5.00 (24-48hr)</span>
                  </button>
                </div>
              </div>

              {/* Delivery Address (Conditional) */}
              {deliveryMethod === "delivery" && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-navy block mb-1">
                    Delivery Address / Town in Ghana <span className="text-sale-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="e.g. House No. 12, East Legon, Accra"
                    className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-3.5 text-base sm:text-sm text-navy placeholder:text-zinc-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  />
                </div>
              )}

              {/* Special Instructions / Notes */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-navy block mb-1">
                  Order Note (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Call when dispatch driver arrives"
                  className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-3.5 text-base sm:text-sm text-navy placeholder:text-zinc-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                />
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 border-t border-zinc-200 pt-4 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Items Subtotal:</span>
                  <span className="font-semibold text-navy">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-zinc-600">
                  <span>Delivery Fee:</span>
                  <span className="font-semibold text-navy">
                    {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                  </span>
                </div>

                <div className="flex justify-between border-t border-zinc-200 pt-2 text-base font-extrabold text-navy">
                  <span>Total Amount:</span>
                  <span className="text-lg text-navy">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Primary CTA: Place Order on WhatsApp */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 px-6 text-sm font-bold uppercase tracking-wider shadow-lg shadow-green-600/25 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-98 cursor-pointer"
              >
                <MessageCircle className="h-5 w-5 fill-white" />
                <span>
                  {isSubmitting
                    ? "Opening WhatsApp DM..."
                    : "Place Order on WhatsApp"}
                </span>
              </button>
            </form>

            {/* Direct DM explanation */}
            <p className="mt-3 text-center text-[11px] text-zinc-500 leading-normal">
              Clicking &ldquo;Place Order&rdquo; will open a direct WhatsApp chat
              with <strong>{STORE_CONFIG.phoneDisplay}</strong> with all your items and details
              pre-typed for instant confirmation.
            </p>

            {/* Guarantees */}
            <div className="mt-6 space-y-2 border-t border-zinc-200 pt-4">
              <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                <span>
                  Direct WhatsApp DM with {STORE_CONFIG.name} ({STORE_CONFIG.phoneDisplay})
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                <ShieldCheck className="h-3.5 w-3.5 text-navy shrink-0" />
                <span>100% Verified Quality &amp; Genuine Products</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                <Truck className="h-3.5 w-3.5 text-navy shrink-0" />
                <span>Free Accra Pickup or 24-48hr Express Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
