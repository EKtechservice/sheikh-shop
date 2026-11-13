"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { type Product } from "@/data/products";
import { createProductAction, updateProductAction } from "./product-actions";
import {
  X,
  Upload,
  Loader2,
  DollarSign,
  Tag,
  Layers,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const CATEGORY_OPTIONS = [
  { slug: "shirts", name: "Shirts" },
  { slug: "polo-shirts", name: "Polo Shirts" },
  { slug: "shorts", name: "Shorts" },
  { slug: "boxers", name: "Boxers" },
  { slug: "perfumes", name: "Perfumes" },
  { slug: "jeans", name: "Jeans" },
  { slug: "slides", name: "Slides" },
  { slug: "combo-deals", name: "Combo Deals" },
  { slug: "birthday-gifts", name: "Birthday Gifts" },
  { slug: "preorder", name: "Preorder Gadgets" },
];

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialProduct?: Product | null;
}

export default function ProductFormModal({
  isOpen,
  onClose,
  onSuccess,
  initialProduct,
}: ProductFormModalProps) {
  const isEditing = Boolean(initialProduct);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("shirts");
  const [categoryName, setCategoryName] = useState("Shirts");
  const [price, setPrice] = useState("");
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);
  const [onSale, setOnSale] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [sizes, setSizes] = useState("L, XL, XXL");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form state when opening / switching between edit or add
  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setCategory(initialProduct.category || "shirts");
      setCategoryName(initialProduct.categoryName || "Shirts");
      setPrice(initialProduct.price.toString());
      setCompareAtPrice(initialProduct.compareAtPrice ? initialProduct.compareAtPrice.toString() : "");
      setDescription(initialProduct.description || "");
      setInStock(initialProduct.inStock !== false);
      setOnSale(Boolean(initialProduct.onSale));
      setIsNewArrival(Boolean(initialProduct.isNewArrival));
      setSizes(initialProduct.sizes ? initialProduct.sizes.join(", ") : "");
      setImagePreview(initialProduct.image);
      setSelectedFile(null);
    } else {
      setName("");
      setCategory("shirts");
      setCategoryName("Shirts");
      setPrice("");
      setCompareAtPrice("");
      setDescription("");
      setInStock(true);
      setOnSale(false);
      setIsNewArrival(false);
      setSizes("L, XL, XXL");
      setImagePreview(null);
      setSelectedFile(null);
    }
    setErrorMessage(null);
  }, [initialProduct, isOpen]);

  // Handle category dropdown change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    setCategory(slug);
    const found = CATEGORY_OPTIONS.find((c) => c.slug === slug);
    if (found) {
      setCategoryName(found.name);
    }
  };

  // Handle Image File selection with preview & validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setErrorMessage("Image file exceeds 4MB limit. Please choose a smaller photo.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setErrorMessage("Price must be a valid positive number greater than 0.");
      return;
    }

    if (!name.trim()) {
      setErrorMessage("Product name is required.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    if (initialProduct?.id) {
      formData.append("id", initialProduct.id.toString());
    }
    formData.append("name", name.trim());
    formData.append("category", category);
    formData.append("categoryName", categoryName);
    formData.append("price", numPrice.toString());
    if (compareAtPrice.trim()) {
      formData.append("compareAtPrice", parseFloat(compareAtPrice).toString());
    }
    formData.append("description", description.trim());
    formData.append("inStock", inStock ? "true" : "false");
    formData.append("onSale", onSale ? "true" : "false");
    formData.append("isNewArrival", isNewArrival ? "true" : "false");
    formData.append("sizes", sizes);

    if (selectedFile) {
      formData.append("imageFile", selectedFile);
    } else if (imagePreview) {
      formData.append("existingImage", imagePreview);
    }

    try {
      const res = isEditing
        ? await updateProductAction(formData)
        : await createProductAction(formData);

      if (res.error) {
        setErrorMessage(res.error);
        setIsSubmitting(false);
        return;
      }

      onSuccess();
      onClose();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isEditing ? "Edit Product" : "Add New Product"}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm overflow-hidden"
    >
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-t-3xl sm:rounded-2xl border border-white/10 bg-[#0D1016] text-white shadow-2xl overflow-hidden z-10 flex flex-col max-h-[100dvh] sm:max-h-[90dvh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 sm:px-6 py-4 bg-[#141A26] shrink-0 pt-safe">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-[#1B2A4A] text-[#B98B63] shrink-0">
              <Tag className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white leading-tight">
                {isEditing ? "Edit Product & Price" : "Add New Product"}
              </h2>
              <p className="text-[11px] text-zinc-400">
                {isEditing
                  ? `Updating: ${initialProduct?.name}`
                  : "Instant live sync to store catalog"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-4 sm:space-y-5">
          {/* Error Message Alert */}
          {errorMessage && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-200"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Product Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Oxford Cotton Shirt"
                className="w-full h-11 sm:h-10 rounded-xl border border-white/15 bg-white/5 px-3.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Category / Department
              </label>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full h-11 sm:h-10 rounded-xl border border-white/15 bg-[#141A26] px-3.5 text-base sm:text-sm text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.slug} value={opt.slug}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Price & Compare At Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Selling Price (USD $) <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <DollarSign className="h-4 w-4" />
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="29.99"
                  className="w-full h-11 sm:h-10 rounded-xl border border-white/15 bg-white/5 pl-9 pr-3.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Original Price (Strike-through)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <DollarSign className="h-4 w-4" />
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={compareAtPrice}
                  onChange={(e) => setCompareAtPrice(e.target.value)}
                  placeholder="39.99 (Optional)"
                  className="w-full h-11 sm:h-10 rounded-xl border border-white/15 bg-white/5 pl-9 pr-3.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>
            </div>
          </div>

          {/* 3. Product Photo Upload / Preview */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Product Photo
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-dashed border-white/20 bg-white/[0.02] p-4">
              {/* Preview Thumbnail */}
              <div className="relative h-20 w-20 shrink-0 rounded-xl bg-zinc-900 border border-white/10 overflow-hidden flex items-center justify-center">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-contain p-1"
                  />
                ) : (
                  <span className="text-[10px] text-zinc-500 text-center px-1">
                    No image
                  </span>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1 space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  <Upload className="h-4 w-4" />
                  <span>{imagePreview ? "Change Photo / Camera" : "Take Photo / Upload"}</span>
                </button>
                <p className="text-[11px] text-zinc-400">
                  Supports camera capture and photo library on mobile. Stored in Supabase CDN.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Sizes & Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Available Sizes / Variants <span className="text-zinc-500">(Comma separated)</span>
            </label>
            <input
              type="text"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              placeholder="S, M, L, XL, XXL (or 42, 43, 44, 45)"
              className="w-full h-11 sm:h-10 rounded-xl border border-white/15 bg-white/5 px-3.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Description &amp; Fabric Details
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Crafted from 100% premium long-staple cotton with tailored finish..."
              className="w-full rounded-xl border border-white/15 bg-white/5 p-3.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white resize-y"
            />
          </div>

          {/* 5. Toggles: In Stock / On Sale / New Arrival */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <label className="flex min-h-[44px] items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="h-5 w-5 rounded border-zinc-600 bg-zinc-800 text-[#1B2A4A] focus:ring-0"
              />
              <span className="text-xs font-semibold text-zinc-200">
                In Stock (Available)
              </span>
            </label>

            <label className="flex min-h-[44px] items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                checked={onSale}
                onChange={(e) => setOnSale(e.target.checked)}
                className="h-5 w-5 rounded border-zinc-600 bg-zinc-800 text-[#1B2A4A] focus:ring-0"
              />
              <span className="text-xs font-semibold text-zinc-200">
                On Sale (Discount Badge)
              </span>
            </label>

            <label className="flex min-h-[44px] items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                checked={isNewArrival}
                onChange={(e) => setIsNewArrival(e.target.checked)}
                className="h-5 w-5 rounded border-zinc-600 bg-zinc-800 text-[#1B2A4A] focus:ring-0"
              />
              <span className="text-xs font-semibold text-zinc-200">
                New Arrival
              </span>
            </label>
          </div>

          {/* Footer Submit Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 pb-safe">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#1B2A4A] hover:bg-[#141F38] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{isEditing ? "Save Price & Changes" : "Publish Product"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
