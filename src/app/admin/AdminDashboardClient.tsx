"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import ProductFormModal from "./ProductFormModal";
import {
  getAdminProducts,
  deleteProductAction,
  seedInitialProductsAction,
} from "./product-actions";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  AlertTriangle,
  Loader2,
  Package,
  ExternalLink,
  Database,
  Sparkles,
} from "lucide-react";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scrollLock";
import { useRouter } from "next/navigation";

interface AdminDashboardClientProps {
  initialProducts: Product[];
  ownerEmail: string;
}

export default function AdminDashboardClient({
  initialProducts,
  ownerEmail,
}: AdminDashboardClientProps) {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState<"all" | "in-stock" | "out-of-stock">("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Delete State
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Seed State
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === "all" ||
        p.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in-stock" && p.inStock !== false) ||
        (stockFilter === "out-of-stock" && p.inStock === false);

      return matchesSearch && matchesCat && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, stockFilter]);

  // Statistics
  const totalCount = products.length;
  const inStockCount = products.filter((p) => p.inStock !== false).length;
  const outOfStockCount = totalCount - inStockCount;
  const onSaleCount = products.filter((p) => p.onSale).length;

  // Sync state if initialProducts changes from Server Component
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // Lock body scroll and listen for back/escape when delete dialog is open
  useEffect(() => {
    if (productToDelete) {
      lockBodyScroll();

      window.history.pushState({ dialog: "delete-confirm" }, "");
      const handlePopState = () => {
        setProductToDelete(null);
      };
      window.addEventListener("popstate", handlePopState);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setProductToDelete(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        unlockBodyScroll();
        window.removeEventListener("popstate", handlePopState);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [productToDelete]);

  const reloadProducts = async () => {
    const res = await getAdminProducts();
    if (res.products && res.products.length > 0) {
      setProducts(res.products);
    }
    router.refresh();
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleModalSuccess = async () => {
    await reloadProducts();
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const res = await deleteProductAction(productToDelete.id.toString());
      if (res.error) {
        setDeleteError(res.error);
        setIsDeleting(false);
        return;
      }

      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
      await reloadProducts();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSeedProducts = async () => {
    setIsSeeding(true);
    setSeedMessage(null);

    try {
      const res = await seedInitialProductsAction();
      if (res.error) {
        setSeedMessage(`Notice: ${res.error}`);
      } else {
        setSeedMessage("Successfully imported initial products into Supabase!");
        await reloadProducts();
      }
    } catch (err) {
      setSeedMessage(`Error: ${err instanceof Error ? err.message : "Failed to import"}`);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Metric Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#0D1016] p-4 sm:p-5 shadow-sm">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Total Catalog
          </span>
          <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-extrabold text-white">
            {totalCount}
          </p>
          <span className="mt-0.5 sm:mt-1 block text-[11px] sm:text-xs text-zinc-500">Live in Supabase</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0D1016] p-4 sm:p-5 shadow-sm">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            In Stock
          </span>
          <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-extrabold text-emerald-400">
            {inStockCount}
          </p>
          <span className="mt-0.5 sm:mt-1 block text-[11px] sm:text-xs text-zinc-500">Available to order</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0D1016] p-4 sm:p-5 shadow-sm">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-red-400">
            Sold Out
          </span>
          <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-extrabold text-red-400">
            {outOfStockCount}
          </p>
          <span className="mt-0.5 sm:mt-1 block text-[11px] sm:text-xs text-zinc-500">Needs restock</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0D1016] p-4 sm:p-5 shadow-sm">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#B98B63]">
            On Sale
          </span>
          <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-extrabold text-[#B98B63]">
            {onSaleCount}
          </p>
          <span className="mt-0.5 sm:mt-1 block text-[11px] sm:text-xs text-zinc-500">Active promo prices</span>
        </div>
      </div>

      {/* 2. Empty Database Seed Callout (Shows if 0 products in database) */}
      {totalCount === 0 && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 sm:p-6 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Initial Products Setup</span>
            </h3>
            <p className="text-xs text-amber-300/80 max-w-xl">
              Your Supabase <code>products</code> table is currently empty. You can import all 21 items from your store catalog with one click.
            </p>
            {seedMessage && (
              <p className="text-xs font-semibold text-emerald-300 mt-2">
                {seedMessage}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSeedProducts}
            disabled={isSeeding}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-md transition-all shrink-0 disabled:opacity-60 cursor-pointer"
          >
            {isSeeding ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Importing...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Import Store Catalog (21 Items)</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* 3. Controls Bar: Search, Category Filters, and Add Product Button */}
      <div className="rounded-2xl border border-white/10 bg-[#0D1016] p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
              <Search className="h-5 w-5 sm:h-4 sm:w-4" />
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, category..."
              className="w-full h-11 sm:h-10 rounded-xl border border-white/15 bg-white/5 pl-11 pr-4 text-base sm:text-xs text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>

          {/* Add Product Button */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#1B2A4A] hover:bg-[#141F38] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Filter Row: Category & Stock Filter */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-zinc-500 font-semibold uppercase text-[10px]">
            <Filter className="h-3.5 w-3.5" />
            <span>Filters:</span>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-11 sm:h-9 rounded-lg border border-white/15 bg-[#141A26] px-3 text-base sm:text-xs text-white focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="shirts">Shirts</option>
              <option value="polo-shirts">Polo Shirts</option>
              <option value="shorts">Shorts</option>
              <option value="boxers">Boxers</option>
              <option value="perfumes">Perfumes</option>
              <option value="jeans">Jeans</option>
              <option value="slides">Slides</option>
              <option value="combo-deals">Combo Deals</option>
              <option value="birthday-gifts">Birthday Gifts</option>
              <option value="preorder">Preorder Gadgets</option>
            </select>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as "all" | "in-stock" | "out-of-stock")}
              className="h-11 sm:h-9 rounded-lg border border-white/15 bg-[#141A26] px-3 text-base sm:text-xs text-white focus:outline-none"
            >
              <option value="all">All Stock Status</option>
              <option value="in-stock">In Stock Only</option>
              <option value="out-of-stock">Sold Out Only</option>
            </select>
          </div>

          {(searchQuery || selectedCategory !== "all" || stockFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setStockFilter("all");
              }}
              className="text-zinc-400 hover:text-white underline text-xs sm:text-[11px] py-1 text-right"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* 4. Products Display: Adaptive Mobile Cards (<640px) + Data Table (>=640px) */}
      <div className="rounded-2xl border border-white/10 bg-[#0D1016] shadow-sm overflow-hidden">
        {filteredProducts.length > 0 ? (
          <>
            {/* MOBILE VIEW (< 640px): Rich Touch Cards */}
            <div className="block sm:hidden divide-y divide-white/5">
              {filteredProducts.map((product) => (
                <div key={product.id} className="p-4 space-y-3.5">
                  {/* Top: Thumbnail, Title, Category Badge */}
                  <div className="flex items-start gap-3.5">
                    <div className="relative h-16 w-16 shrink-0 rounded-xl bg-zinc-900 border border-white/10 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-white text-sm leading-snug line-clamp-2">
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                        /{product.slug}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span className="inline-block rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-medium text-zinc-300">
                          {product.categoryName || product.category || "General"}
                        </span>

                        {product.inStock !== false ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>In Stock</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-md bg-red-500/10 border border-red-500/30 px-2 py-0.5 text-[10px] font-bold text-red-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                            <span>Sold Out</span>
                          </span>
                        )}

                        {product.onSale && (
                          <span className="rounded-md bg-[#B98B63]/15 border border-[#B98B63]/30 px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#B98B63]">
                            Sale
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Price Breakdown */}
                  <div className="flex items-baseline justify-between pt-1 border-t border-white/5">
                    <span className="text-xs text-zinc-400 uppercase font-semibold">Price:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-white">
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-zinc-500 line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom: 44px Touch Action Buttons */}
                  <div className="grid grid-cols-6 gap-2 pt-1">
                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(product)}
                      className="col-span-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#1B2A4A] hover:bg-[#141F38] text-white text-xs font-bold uppercase tracking-wider shadow-sm active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span>Edit Item</span>
                    </button>

                    {/* View in Store */}
                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      className="col-span-1 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 active:scale-[0.98] transition-all"
                      title="View on store"
                      aria-label={`View ${product.name} on public store`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => setProductToDelete(product)}
                      className="col-span-1 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-900/50 hover:text-red-300 active:scale-[0.98] transition-all cursor-pointer"
                      title="Delete product"
                      aria-label={`Delete ${product.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP VIEW (>= 640px): High-Density Data Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#141A26] text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    <th className="py-3.5 px-4 sm:px-6">Product</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Item Image & Title */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative h-14 w-14 shrink-0 rounded-xl bg-zinc-900 border border-white/10 overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-white text-xs sm:text-sm truncate">
                              {product.name}
                            </p>
                            <p className="text-[11px] text-zinc-500 truncate">
                              /{product.slug}
                            </p>
                            <span className="inline-block md:hidden text-[10px] text-zinc-400 font-semibold mt-0.5">
                              {product.categoryName || product.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 hidden md:table-cell">
                        <span className="inline-block rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-medium text-zinc-300">
                          {product.categoryName || product.category || "Uncategorized"}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-white text-sm">
                            {formatPrice(product.price)}
                          </span>
                          {product.compareAtPrice && (
                            <span className="text-[11px] text-zinc-500 line-through">
                              {formatPrice(product.compareAtPrice)}
                            </span>
                          )}
                          {product.onSale && (
                            <span className="text-[10px] text-[#B98B63] font-bold uppercase tracking-wider">
                              Sale
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Stock Status */}
                      <td className="py-4 px-4">
                        {product.inStock !== false ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>In Stock</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/30 px-2.5 py-1 text-[11px] font-bold text-red-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                            <span>Sold Out</span>
                          </span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View in Store */}
                          <Link
                            href={`/products/${product.slug}`}
                            target="_blank"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
                            title="View on public shop"
                            aria-label={`View ${product.name} on public store`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>

                          {/* Edit Button */}
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(product)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-300 hover:bg-[#1B2A4A] hover:text-white transition-colors cursor-pointer"
                            title="Edit product details & price"
                            aria-label={`Edit ${product.name}`}
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => setProductToDelete(product)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-400 hover:bg-red-950/50 hover:text-red-300 transition-colors cursor-pointer"
                            title="Delete product"
                            aria-label={`Delete ${product.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="py-14 text-center px-4">
            <Package className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-zinc-300">
              No matching products found
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              Try adjusting your search query or category filters.
            </p>
          </div>
        )}
      </div>

      {/* 5. Add / Edit Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
        initialProduct={editingProduct}
      />

      {/* 6. Delete Confirmation Dialog */}
      {productToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Confirm Product Deletion"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="fixed inset-0" onClick={() => setProductToDelete(null)} />

          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0D1016] p-5 sm:p-6 text-white shadow-2xl z-10">
            <div className="flex items-center gap-3 text-red-400 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-950/60 border border-red-500/30 shrink-0">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold uppercase tracking-tight text-white">
                Delete Product
              </h3>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong>&ldquo;{productToDelete.name}&rdquo;</strong> from your catalog?
            </p>

            <p className="text-[11px] text-zinc-500 mt-2">
              This will remove the product and update public customer catalog pages immediately.
            </p>

            {deleteError && (
              <div className="mt-3 rounded-lg bg-red-950/40 border border-red-500/30 p-2.5 text-xs text-red-200">
                {deleteError}
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all disabled:opacity-60 cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete Item</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
