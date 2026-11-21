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
  Trash2,
  Check,
  Wand2,
} from "lucide-react";

export interface CategoryMeta {
  slug: string;
  name: string;
  exampleName: string;
  examplePrice: string;
  exampleCompareAtPrice: string;
  exampleDescription: string;
  defaultSizes: string;
  suggestedSizes: readonly string[];
  fallbackImage: string;
}

export const CATEGORY_DEFINITIONS: Record<string, CategoryMeta> = {
  shirts: {
    slug: "shirts",
    name: "Shirts",
    exampleName: "Oxford Cotton Button-Down Shirt",
    examplePrice: "80.00",
    exampleCompareAtPrice: "120.00",
    exampleDescription: "Crafted from 100% premium long-staple Egyptian cotton. Features a tailored modern collar, mother-of-pearl buttons, and breathable all-day comfort.",
    defaultSizes: "S, M, L, XL, 2XL, 3XL, 4XL",
    suggestedSizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    fallbackImage: "/images/categories/shirts-v2.png",
  },
  "polo-shirts": {
    slug: "polo-shirts",
    name: "Polo Shirts",
    exampleName: "Breezy French Linen Polo Shirt",
    examplePrice: "95.00",
    exampleCompareAtPrice: "130.00",
    exampleDescription: "Woven in airy French flax linen blend with a ribbed open collar. Naturally thermoregulating and effortless for warm-weather smart casual dressing.",
    defaultSizes: "S, M, L, XL, 2XL, 3XL, 4XL",
    suggestedSizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    fallbackImage: "/images/categories/polo-shirts-v2.png",
  },
  hoodies: {
    slug: "hoodies",
    name: "Hoodies",
    exampleName: "Heavyweight Fleece Pullover Hoodie",
    examplePrice: "85.00",
    exampleCompareAtPrice: "120.00",
    exampleDescription: "Crafted from ultra-soft 450GSM heavyweight brushed cotton fleece. Features a double-lined crossover hood, kangaroo pocket, and durable ribbed trims.",
    defaultSizes: "S, M, L, XL, 2XL, 3XL, 4XL",
    suggestedSizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    fallbackImage: "/images/categories/hoodies-v2.png",
  },
  joggers: {
    slug: "joggers",
    name: "Joggers",
    exampleName: "Tailored Tech Fleece Slim Joggers",
    examplePrice: "75.00",
    exampleCompareAtPrice: "105.00",
    exampleDescription: "Engineered with premium double-knit French terry cotton. Features tailored tapered legs, custom metal-tipped drawstrings, and deep secure zip pockets.",
    defaultSizes: "S, M, L, XL, 2XL, 3XL, 4XL",
    suggestedSizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    fallbackImage: "/images/categories/joggers-v2.png",
  },
  shorts: {
    slug: "shorts",
    name: "Shorts",
    exampleName: "Tailored Linen Summer Shorts",
    examplePrice: "60.00",
    exampleCompareAtPrice: "85.00",
    exampleDescription: "Tailored flat-front summer shorts in breathable linen-cotton blend with customized horn buttons and slash side pockets.",
    defaultSizes: "S, M, L, XL, 2XL, 3XL, 4XL",
    suggestedSizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    fallbackImage: "/images/categories/shorts-v2.png",
  },
  boxers: {
    slug: "boxers",
    name: "Boxers",
    exampleName: "Silk Touch Modal Boxer Briefs (3-Pack)",
    examplePrice: "35.00",
    exampleCompareAtPrice: "50.00",
    exampleDescription: "Ultra-soft botanical micromodal with 4-way stretch, anti-roll waistband, and friction-free ergonomic pouch construction.",
    defaultSizes: "M, L, XL, 2XL, 3XL, 4XL",
    suggestedSizes: ["M", "L", "XL", "2XL", "3XL", "4XL"],
    fallbackImage: "/images/categories/boxers-v2.png",
  },
  perfumes: {
    slug: "perfumes",
    name: "Perfumes",
    exampleName: "Oud Royale Extrait de Parfum (100ml)",
    examplePrice: "110.00",
    exampleCompareAtPrice: "150.00",
    exampleDescription: "Masterpiece artisanal fragrance combining smoked Cambodian oud, Damascus rose, and golden amber with an enduring 16-hour sillage.",
    defaultSizes: "50ml, 100ml",
    suggestedSizes: ["30ml", "50ml", "100ml", "120ml"],
    fallbackImage: "/images/categories/perfumes-v2.png",
  },
  jeans: {
    slug: "jeans",
    name: "Jeans",
    exampleName: "Slim-Fit Japanese Selvedge Denim Jeans",
    examplePrice: "95.00",
    exampleCompareAtPrice: "135.00",
    exampleDescription: "13.5oz authentic selvedge denim with 2% comfort stretch. Custom antiqued copper rivets and a tailored taper from knee to hem.",
    defaultSizes: "30, 32, 34, 36, 38, 40",
    suggestedSizes: ["30", "32", "34", "36", "38", "40"],
    fallbackImage: "/images/categories/jeans-v2.png",
  },
  slides: {
    slug: "slides",
    name: "Slides",
    exampleName: "Contoured Ergonomic Leather Slides",
    examplePrice: "65.00",
    exampleCompareAtPrice: "90.00",
    exampleDescription: "Supple full-grain calfskin leather band over an anatomically molded arch-support footbed with non-slip grooved rubber outsole.",
    defaultSizes: "40, 41, 42, 43, 44, 45",
    suggestedSizes: ["40", "41", "42", "43", "44", "45"],
    fallbackImage: "/images/categories/slides-v2.png",
  },
  "combo-deals": {
    slug: "combo-deals",
    name: "Combo Deals",
    exampleName: "Executive Style Trio (Shirt + Shorts + Cologne)",
    examplePrice: "160.00",
    exampleCompareAtPrice: "220.00",
    exampleDescription: "Curated 3-piece bundle containing our Oxford Cotton Shirt, tailored shorts, and 50ml signature perfume. Complete wardrobe upgrade with exclusive bundle savings.",
    defaultSizes: "Standard Set, Deluxe Set, VIP Executive Box",
    suggestedSizes: ["Standard Set", "Deluxe Set", "VIP Executive Box"],
    fallbackImage: "/images/categories/combo-deals-v2.png",
  },
  "birthday-gifts": {
    slug: "birthday-gifts",
    name: "Birthday Gifts",
    exampleName: "Gentleman's Deluxe Black-Box Gift Hamper",
    examplePrice: "140.00",
    exampleCompareAtPrice: "185.00",
    exampleDescription: "Luxury black-and-gold gift presentation box complete with silk-finish ribbon, premium polo shirt, luxury perfume, and personalized greeting card.",
    defaultSizes: "Standard Hamper, Luxury Box, VIP Deluxe",
    suggestedSizes: ["Standard Hamper", "Luxury Box", "VIP Deluxe"],
    fallbackImage: "/images/categories/birthday-gifts-v2.png",
  },
  preorder: {
    slug: "preorder",
    name: "Preorder Gadgets",
    exampleName: "Flagship Smartphone Pro Max (256GB - Titanium)",
    examplePrice: "1199.00",
    exampleCompareAtPrice: "1299.00",
    exampleDescription: "Preorder the latest flagship mobile device. Grade 5 aerospace titanium, A-series pro bionic chip, Super Retina XDR display, and 24-48hr nationwide express delivery.",
    defaultSizes: "128GB, 256GB, 512GB, 1TB",
    suggestedSizes: ["128GB", "256GB", "512GB", "1TB"],
    fallbackImage: "/images/categories/combo-deals-banner.png",
  },
};

export const CATEGORY_OPTIONS = Object.values(CATEGORY_DEFINITIONS).map((c) => ({
  slug: c.slug,
  name: c.name,
}));

export const STANDARD_SIZES = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"] as const;
export const DEFAULT_SIZES = "S, M, L, XL, 2XL, 3XL, 4XL";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scrollLock";

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
  const [sizes, setSizes] = useState(DEFAULT_SIZES);
  // Front Photo State
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Back Photo State (New Feature)
  const [backImagePreview, setBackImagePreview] = useState<string | null>(null);
  const [selectedBackFile, setSelectedBackFile] = useState<File | null>(null);
  const backFileInputRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to check if a size is currently included in the comma-separated string
  const isSizeActive = (size: string): boolean => {
    const list = sizes
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    const target = size.toLowerCase();
    return (
      list.includes(target) ||
      (target === "2xl" && list.includes("xxl")) ||
      (target === "xxl" && list.includes("2xl"))
    );
  };

  // Helper to toggle a size on/off in the comma-separated sizes string
  const toggleSize = (sizeToToggle: string) => {
    const list = sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const target = sizeToToggle.toLowerCase();
    const exists = list.some(
      (s) =>
        s.toLowerCase() === target ||
        (target === "2xl" && s.toLowerCase() === "xxl") ||
        (target === "xxl" && s.toLowerCase() === "2xl")
    );

    let updated: string[];
    if (exists) {
      updated = list.filter(
        (s) =>
          s.toLowerCase() !== target &&
          !(target === "2xl" && s.toLowerCase() === "xxl") &&
          !(target === "xxl" && s.toLowerCase() === "2xl")
      );
    } else {
      const getOrder = (s: string) => {
        const idx = STANDARD_SIZES.findIndex(
          (std) =>
            std.toLowerCase() === s.toLowerCase() ||
            (std === "2XL" && s.toLowerCase() === "xxl")
        );
        return idx !== -1 ? idx : 999;
      };

      updated = [...list, sizeToToggle].sort((a, b) => {
        const ordA = getOrder(a);
        const ordB = getOrder(b);
        if (ordA !== ordB) return ordA - ordB;
        return a.localeCompare(b);
      });
    }

    setSizes(updated.join(", "));
  };

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
      setBackImagePreview(initialProduct.backImage || null);
      setSelectedBackFile(null);
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
      setSizes(DEFAULT_SIZES);
      setImagePreview(null);
      setSelectedFile(null);
      setBackImagePreview(null);
      setSelectedBackFile(null);
    }
    setErrorMessage(null);
  }, [initialProduct, isOpen]);

  // Lock body scroll and handle Android back button & Escape key when modal is open
  useEffect(() => {
    if (isOpen) {
      lockBodyScroll();

      window.history.pushState({ modal: "admin-product-form" }, "");
      const handlePopState = () => {
        onClose();
      };
      window.addEventListener("popstate", handlePopState);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        unlockBodyScroll();
        window.removeEventListener("popstate", handlePopState);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const activeCatMeta = CATEGORY_DEFINITIONS[category] || CATEGORY_DEFINITIONS.shirts;

  // Handle category change (from dropdown or category quick-chips)
  const selectCategory = (newSlug: string) => {
    setCategory(newSlug);
    const catMeta = CATEGORY_DEFINITIONS[newSlug] || CATEGORY_DEFINITIONS.shirts;
    setCategoryName(catMeta.name);

    // If adding a new product, adopt the default sizes for that department
    if (!isEditing) {
      setSizes(catMeta.defaultSizes);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectCategory(e.target.value);
  };

  // One-click quick fill with category-specific example
  const handleLoadCategoryExample = () => {
    const meta = CATEGORY_DEFINITIONS[category] || CATEGORY_DEFINITIONS.shirts;
    setName(meta.exampleName);
    setPrice(meta.examplePrice);
    setCompareAtPrice(meta.exampleCompareAtPrice);
    setDescription(meta.exampleDescription);
    setSizes(meta.defaultSizes);
    setImagePreview(meta.fallbackImage);
    setSelectedFile(null);
  };

  // Handle Front Image File selection with preview & validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Front image exceeds 5MB limit. Please choose a smaller photo.");
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

  // Handle Back Image File selection with preview & validation
  const handleBackFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Back image exceeds 5MB limit. Please choose a smaller photo.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    setErrorMessage(null);
    setSelectedBackFile(file);
    const objectUrl = URL.createObjectURL(file);
    setBackImagePreview(objectUrl);
  };

  const handleRemoveBackImage = () => {
    setSelectedBackFile(null);
    setBackImagePreview(null);
    if (backFileInputRef.current) {
      backFileInputRef.current.value = "";
    }
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

    // Front image payload
    if (selectedFile) {
      formData.append("imageFile", selectedFile);
    } else if (imagePreview) {
      formData.append("existingImage", imagePreview);
    }

    // Back image payload
    if (selectedBackFile) {
      formData.append("backImageFile", selectedBackFile);
    } else if (backImagePreview) {
      formData.append("existingBackImage", backImagePreview);
    } else {
      formData.append("removeBackImage", "true");
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
      <div className="relative w-full max-w-2xl rounded-t-3xl sm:rounded-2xl border border-white/10 bg-[#0D1016] text-white shadow-2xl overflow-hidden z-10 flex flex-col max-h-screen max-h-[100dvh] sm:max-h-[90dvh] pb-safe">
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

          {/* 0. Category Example Quick-Fill Banner */}
          <div className="rounded-2xl border border-[#B98B63]/30 bg-gradient-to-r from-[#B98B63]/15 via-white/[0.03] to-transparent p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#B98B63]/25 border border-[#B98B63]/40 flex items-center justify-center shrink-0">
                <Wand2 className="h-4 w-4 text-[#E5D3B3]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Example for {activeCatMeta.name}:</span>
                  <span className="font-medium text-[#E5D3B3] line-clamp-1">{activeCatMeta.exampleName}</span>
                </p>
                <p className="text-[11px] text-zinc-400">
                  Select any category to auto-adapt sizes, pricing, and examples.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLoadCategoryExample}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl bg-[#B98B63] hover:bg-[#a67c55] px-3.5 py-1.5 text-xs font-bold text-black transition-all cursor-pointer shrink-0 shadow-md active:scale-95"
              title={`Load ready-to-publish ${activeCatMeta.name} example template`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Load {activeCatMeta.name} Example</span>
            </button>
          </div>

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
                placeholder={`e.g. ${activeCatMeta.exampleName}`}
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

          {/* Quick Category Chips for One-Tap Selection across all 10 departments */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Quick Select Category:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORY_OPTIONS.map((opt) => {
                const isSelected = category === opt.slug;
                return (
                  <button
                    key={opt.slug}
                    type="button"
                    onClick={() => selectCategory(opt.slug)}
                    className={`inline-flex min-h-[34px] items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#B98B63] text-black font-bold shadow-sm ring-1 ring-[#B98B63]/40"
                        : "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-black" />}
                    <span>{opt.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Price & Compare At Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Selling Price (GH₵) <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 font-bold text-[11px]">
                  GH₵
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={activeCatMeta.examplePrice}
                  className="w-full h-11 sm:h-10 rounded-xl border border-white/15 bg-white/5 pl-12 pr-3.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Original Price (Strike-through - GH₵)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 font-bold text-[11px]">
                  GH₵
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={compareAtPrice}
                  onChange={(e) => setCompareAtPrice(e.target.value)}
                  placeholder={`${activeCatMeta.exampleCompareAtPrice} (Optional)`}
                  className="w-full h-11 sm:h-10 rounded-xl border border-white/15 bg-white/5 pl-12 pr-3.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>
            </div>
          </div>

          {/* 3. Product Photos Upload: Front View & Back View */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                Product Photos <span className="text-[#B98B63]">(Front &amp; Back Views)</span>
              </label>
              <span className="text-[11px] text-zinc-400">
                Supports Camera &amp; Gallery
              </span>
            </div>

            <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-4 sm:p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 3A. FRONT PHOTO */}
                <div className="rounded-xl border border-white/10 bg-[#141A26]/80 p-3.5 flex flex-col justify-between gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E5D3B3] flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#B98B63]" />
                      Front View (Main)
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full">
                      Primary
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    {/* Front Thumbnail */}
                    <div className="relative h-20 w-20 shrink-0 rounded-xl bg-zinc-900 border border-white/10 overflow-hidden flex items-center justify-center">
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt="Front Preview"
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <span className="text-[10px] text-zinc-500 text-center px-1">
                          No front image
                        </span>
                      )}
                    </div>

                    {/* Front Controls */}
                    <div className="flex-1 space-y-1.5">
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
                        className="w-full inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-3 py-2 text-xs font-semibold text-white transition-colors cursor-pointer"
                      >
                        <Upload className="h-4 w-4 shrink-0" />
                        <span>{imagePreview ? "Change Front" : "Upload Front"}</span>
                      </button>
                      <p className="text-[10px] text-zinc-400 leading-tight">
                        Main image shown on store catalog.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3B. BACK PHOTO (NEW) */}
                <div className="rounded-xl border border-white/10 bg-[#141A26]/80 p-3.5 flex flex-col justify-between gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-sky-400" />
                      Back View (Reverse)
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full">
                      Optional
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    {/* Back Thumbnail */}
                    <div className="relative h-20 w-20 shrink-0 rounded-xl bg-zinc-900 border border-white/10 overflow-hidden flex items-center justify-center">
                      {backImagePreview ? (
                        <Image
                          src={backImagePreview}
                          alt="Back Preview"
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <span className="text-[10px] text-zinc-500 text-center px-1">
                          No back image
                        </span>
                      )}
                    </div>

                    {/* Back Controls */}
                    <div className="flex-1 space-y-1.5">
                      <input
                        ref={backFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleBackFileChange}
                        className="hidden"
                      />
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => backFileInputRef.current?.click()}
                          className="flex-1 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-3 py-2 text-xs font-semibold text-white transition-colors cursor-pointer"
                        >
                          <Upload className="h-4 w-4 shrink-0" />
                          <span>{backImagePreview ? "Change Back" : "Upload Back"}</span>
                        </button>

                        {backImagePreview && (
                          <button
                            type="button"
                            onClick={handleRemoveBackImage}
                            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
                            title="Remove back photo"
                            aria-label="Remove back photo"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-tight">
                        Shown when customers inspect back of product.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informational Footer */}
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 pt-1 border-t border-white/5">
                <Sparkles className="h-3.5 w-3.5 text-[#B98B63] shrink-0" />
                <span>
                  Both photos are optimized and securely stored in Supabase CDN. Updates appear instantly on the public website.
                </span>
              </div>
            </div>
          </div>

          {/* 4. Sizes & Description */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                Available Sizes / Variants <span className="text-zinc-500 font-normal">({activeCatMeta.name})</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSizes(activeCatMeta.defaultSizes)}
                  className="text-xs font-semibold text-[#B98B63] hover:text-[#d3a378] transition-colors cursor-pointer"
                >
                  Reset ({activeCatMeta.name} Default)
                </button>
                <span className="text-zinc-600 text-xs">•</span>
                <button
                  type="button"
                  onClick={() => setSizes("")}
                  className="text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Quick Toggle Buttons for Current Category */}
            <div className="flex flex-wrap gap-2">
              {activeCatMeta.suggestedSizes.map((size) => {
                const active = isSizeActive(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      active
                        ? "border-[#B98B63] bg-[#B98B63] text-black shadow-sm ring-1 ring-[#B98B63]/40"
                        : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                    }`}
                    title={`Toggle option ${size}`}
                    aria-label={`Toggle option ${size}`}
                  >
                    {active && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    <span>{size}</span>
                  </button>
                );
              })}
            </div>

            {/* Editable Comma-Separated Input */}
            <input
              type="text"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              placeholder={`e.g. ${activeCatMeta.defaultSizes}`}
              className="w-full h-11 sm:h-10 rounded-xl border border-white/15 bg-white/5 px-3.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
            <p className="text-[11px] text-zinc-400">
              Tap any option button above to toggle it instantly, or type custom sizes separated by commas.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Description &amp; Product Details
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={activeCatMeta.exampleDescription}
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
