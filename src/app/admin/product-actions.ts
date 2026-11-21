"use server";

import { createClient } from "@/lib/supabase/server";
import { requireOwner } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ALL_PRODUCTS, type Product } from "@/data/products";
import { mapRowToProduct, type DbProductRow } from "@/lib/products";

// Zod Schema for Product Validation
const productSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(120, "Product name cannot exceed 120 characters"),
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and dashes")
    .optional(),
  category: z.string().trim().min(1, "Please select a category"),
  categoryName: z.string().trim().min(1, "Category name is required"),
  price: z.coerce
    .number({ message: "Price must be a valid number" })
    .positive("Price must be greater than $0")
    .max(99999, "Price cannot exceed $99,999"),
  compareAtPrice: z.coerce
    .number()
    .positive("Compare-at price must be greater than $0")
    .optional()
    .nullable(),
  description: z.string().trim().max(2000, "Description cannot exceed 2000 characters").optional(),
  inStock: z.boolean().default(true),
  onSale: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  sizes: z.array(z.string()).default([]),
  existingImage: z.string().optional(),
  existingBackImage: z.string().optional().nullable(),
});

export interface ActionResult {
  success?: boolean;
  error?: string;
  data?: unknown;
}

function purgeStoreCache(categorySlug?: string, productSlug?: string) {
  try {
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/categories");
    revalidatePath("/categories/[slug]", "page");
    if (categorySlug) {
      revalidatePath(`/categories/${categorySlug}`);
    }
    revalidatePath("/products/[slug]", "page");
    if (productSlug) {
      revalidatePath(`/products/${productSlug}`);
    }
    revalidatePath("/new-arrivals");
    revalidatePath("/sale");
    revalidatePath("/preorder");
    revalidatePath("/search");
    revalidatePath("/admin");
  } catch (err) {
    console.error("Cache revalidation error:", err);
  }
}

function getCategoryFallbackImage(categorySlug?: string): string {
  const map: Record<string, string> = {
    shirts: "/images/categories/shirts-v2.png",
    "polo-shirts": "/images/categories/polo-shirts-v2.png",
    shorts: "/images/categories/shorts-v2.png",
    boxers: "/images/categories/boxers-v2.png",
    perfumes: "/images/categories/perfumes-v2.png",
    jeans: "/images/categories/jeans-v2.png",
    slides: "/images/categories/slides-v2.png",
    "combo-deals": "/images/categories/combo-deals-v2.png",
    "birthday-gifts": "/images/categories/birthday-gifts-v2.png",
    preorder: "/images/categories/combo-deals-banner.png",
  };
  return (categorySlug && map[categorySlug.toLowerCase()]) || "/images/categories/shirts-v2.png";
}

// Reusable Image Uploader to Supabase Storage
async function uploadImageFile(
  supabase: any,
  file: File,
  prefix: string,
  slug: string
): Promise<{ url?: string; error?: string }> {
  if (file.size > 5 * 1024 * 1024) {
    return { error: "Image file exceeds 5MB limit. Please upload a smaller image." };
  }
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return { error: "Only JPG, PNG, and WebP images are allowed." };
  }
  const fileExt = file.type.split("/")[1] || "jpg";
  const fileName = `${prefix}-${crypto.randomUUID().slice(0, 10)}-${slug || "item"}.${fileExt}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(fileName, file, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    return { error: `Failed to upload ${prefix} image: ${uploadError.message}` };
  }

  const { data: publicUrlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(uploadData.path);

  return { url: publicUrlData.publicUrl };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Fetch all products for the admin dashboard (owner only)
 */
export async function getAdminProducts(): Promise<{ products: Product[]; error?: string }> {
  try {
    await requireOwner();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { products: [...ALL_PRODUCTS], error: error.message };
    }

    const liveProducts = (data as DbProductRow[]).map(mapRowToProduct);
    const liveSlugs = new Set(liveProducts.map((p) => p.slug.toLowerCase()));
    const liveIds = new Set(liveProducts.map((p) => String(p.id)));

    const fallbackProducts = ALL_PRODUCTS.filter(
      (p) => !liveSlugs.has(p.slug.toLowerCase()) && !liveIds.has(String(p.id))
    );

    return { products: [...liveProducts, ...fallbackProducts] };
  } catch (err) {
    return {
      products: [...ALL_PRODUCTS],
      error: err instanceof Error ? err.message : "Failed to load products",
    };
  }
}

/**
 * Add / Create a new product (Owner only)
 */
export async function createProductAction(formData: FormData): Promise<ActionResult> {
  try {
    await requireOwner();
    const supabase = await createClient();

    const rawName = formData.get("name")?.toString() || "";
    const rawSlug = formData.get("slug")?.toString() || slugify(rawName);
    const rawCategory = formData.get("category")?.toString() || "";
    const rawCategoryName = formData.get("categoryName")?.toString() || "";
    const rawPrice = formData.get("price")?.toString() || "";
    const rawCompareAtPrice = formData.get("compareAtPrice")?.toString() || null;
    const rawDescription = formData.get("description")?.toString() || "";
    const rawInStock = formData.get("inStock") === "true";
    const rawOnSale = formData.get("onSale") === "true";
    const rawIsNewArrival = formData.get("isNewArrival") === "true";
    const rawSizes = (formData.get("sizes")?.toString() || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const parseResult = productSchema.safeParse({
      name: rawName,
      slug: rawSlug,
      category: rawCategory,
      categoryName: rawCategoryName,
      price: rawPrice,
      compareAtPrice: rawCompareAtPrice ? rawCompareAtPrice : null,
      description: rawDescription,
      inStock: rawInStock,
      onSale: rawOnSale,
      isNewArrival: rawIsNewArrival,
      sizes: rawSizes,
    });

    if (!parseResult.success) {
      return { error: parseResult.error.issues[0]?.message || "Invalid form data" };
    }

    const validData = parseResult.data;

    // Handle Front Image Upload with category-matched fallback
    let imageUrl = getCategoryFallbackImage(validData.category);
    const imageFile = formData.get("imageFile") as File | null;

    if (imageFile && imageFile.size > 0) {
      const uploadRes = await uploadImageFile(supabase, imageFile, "front", validData.slug || "item");
      if (uploadRes.error) {
        return { error: uploadRes.error };
      }
      if (uploadRes.url) {
        imageUrl = uploadRes.url;
      }
    } else {
      const manualUrl = formData.get("imageUrl")?.toString();
      if (manualUrl?.trim()) {
        imageUrl = manualUrl.trim();
      }
    }

    // Handle Back Image Upload (Front & Back Feature)
    let backImageUrl: string | null = null;
    const backImageFile = formData.get("backImageFile") as File | null;
    if (backImageFile && backImageFile.size > 0) {
      const uploadRes = await uploadImageFile(supabase, backImageFile, "back", validData.slug || "item");
      if (uploadRes.error) {
        return { error: uploadRes.error };
      }
      if (uploadRes.url) {
        backImageUrl = uploadRes.url;
      }
    } else {
      const existingBack = formData.get("existingBackImage")?.toString();
      if (existingBack?.trim()) {
        backImageUrl = existingBack.trim();
      }
    }

    // Insert into Supabase products table
    const insertPayload: Record<string, unknown> = {
      name: validData.name,
      slug: validData.slug || slugify(validData.name),
      category: validData.category,
      category_name: validData.categoryName,
      price: validData.price,
      compare_at_price: validData.compareAtPrice ?? null,
      image: imageUrl,
      back_image: backImageUrl || null,
      description: validData.description || null,
      in_stock: validData.inStock,
      on_sale: validData.onSale,
      is_new_arrival: validData.isNewArrival,
      sizes: validData.sizes,
    };

    let { data: inserted, error: insertError } = await supabase
      .from("products")
      .insert(insertPayload)
      .select()
      .single();

    // If back_image column not yet added to Supabase DB, retry without back_image
    if (insertError && (insertError.code === "42703" || insertError.message?.includes("back_image"))) {
      console.warn("Notice: back_image column not present in products table yet. Inserting without back_image.");
      delete insertPayload.back_image;
      const retry = await supabase.from("products").insert(insertPayload).select().single();
      inserted = retry.data;
      insertError = retry.error;
    }

    // If slug already exists, append unique suffix and retry automatically so publishing never fails
    if (insertError && insertError.code === "23505") {
      const fallbackUniqueSlug = `${insertPayload.slug}-${Date.now().toString().slice(-4)}`;
      insertPayload.slug = fallbackUniqueSlug;
      const retryUnique = await supabase.from("products").insert(insertPayload).select().single();
      inserted = retryUnique.data;
      insertError = retryUnique.error;
    }

    if (insertError) {
      return { error: insertError.message };
    }

    purgeStoreCache(validData.category, (inserted as any)?.slug);
    return { success: true, data: inserted };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to create product",
    };
  }
}

/**
 * Edit / Update an existing product (Owner only)
 */
export async function updateProductAction(formData: FormData): Promise<ActionResult> {
  try {
    await requireOwner();
    const supabase = await createClient();

    const productId = formData.get("id")?.toString();
    if (!productId) {
      return { error: "Missing product ID" };
    }

    const rawName = formData.get("name")?.toString() || "";
    const rawSlug = formData.get("slug")?.toString() || slugify(rawName);
    const rawCategory = formData.get("category")?.toString() || "";
    const rawCategoryName = formData.get("categoryName")?.toString() || "";
    const rawPrice = formData.get("price")?.toString() || "";
    const rawCompareAtPrice = formData.get("compareAtPrice")?.toString() || null;
    const rawDescription = formData.get("description")?.toString() || "";
    const rawInStock = formData.get("inStock") === "true";
    const rawOnSale = formData.get("onSale") === "true";
    const rawIsNewArrival = formData.get("isNewArrival") === "true";
    const rawExistingImage = formData.get("existingImage")?.toString() || "";
    const rawExistingBackImage = formData.get("existingBackImage")?.toString() || "";
    const removeBackImage = formData.get("removeBackImage") === "true";
    const rawSizes = (formData.get("sizes")?.toString() || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const parseResult = productSchema.safeParse({
      name: rawName,
      slug: rawSlug,
      category: rawCategory,
      categoryName: rawCategoryName,
      price: rawPrice,
      compareAtPrice: rawCompareAtPrice ? rawCompareAtPrice : null,
      description: rawDescription,
      inStock: rawInStock,
      onSale: rawOnSale,
      isNewArrival: rawIsNewArrival,
      sizes: rawSizes,
    });

    if (!parseResult.success) {
      return { error: parseResult.error.issues[0]?.message || "Invalid form data" };
    }

    const validData = parseResult.data;
    let imageUrl = rawExistingImage || "/images/categories/shirts-v2.png";
    let backImageUrl: string | null = rawExistingBackImage || null;

    // Handle optional front image upload
    const imageFile = formData.get("imageFile") as File | null;
    if (imageFile && imageFile.size > 0) {
      const uploadRes = await uploadImageFile(supabase, imageFile, "front", validData.slug || "item");
      if (uploadRes.error) {
        return { error: uploadRes.error };
      }
      if (uploadRes.url) {
        imageUrl = uploadRes.url;
      }
    }

    // Handle optional back image upload or removal
    const backImageFile = formData.get("backImageFile") as File | null;
    if (backImageFile && backImageFile.size > 0) {
      const uploadRes = await uploadImageFile(supabase, backImageFile, "back", validData.slug || "item");
      if (uploadRes.error) {
        return { error: uploadRes.error };
      }
      if (uploadRes.url) {
        backImageUrl = uploadRes.url;
      }
    } else if (removeBackImage) {
      backImageUrl = null;
    }

    const updatePayload: Record<string, unknown> = {
      name: validData.name,
      slug: validData.slug || slugify(validData.name),
      category: validData.category,
      category_name: validData.categoryName,
      price: validData.price,
      compare_at_price: validData.compareAtPrice ?? null,
      image: imageUrl,
      back_image: backImageUrl,
      description: validData.description || null,
      in_stock: validData.inStock,
      on_sale: validData.onSale,
      is_new_arrival: validData.isNewArrival,
      sizes: validData.sizes,
    };

    let { error: updateError } = await supabase
      .from("products")
      .update(updatePayload)
      .eq("id", productId);

    // If back_image column not present yet, retry update without back_image
    if (updateError && (updateError.code === "42703" || updateError.message?.includes("back_image"))) {
      console.warn("Notice: back_image column not present in products table yet. Updating without back_image.");
      delete updatePayload.back_image;
      const retry = await supabase.from("products").update(updatePayload).eq("id", productId);
      updateError = retry.error;
    }

    if (updateError) {
      return { error: updateError.message };
    }

    purgeStoreCache(validData.category, validData.slug);
    return { success: true };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to update product",
    };
  }
}

/**
 * Delete a product (Owner only)
 */
export async function deleteProductAction(productId: string): Promise<ActionResult> {
  try {
    await requireOwner();
    const supabase = await createClient();

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      return { error: error.message };
    }

    purgeStoreCache();
    return { success: true };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to delete product",
    };
  }
}

/**
 * Quick Seed: Imports all initial 21 store products into Supabase (Owner only)
 */
export async function seedInitialProductsAction(): Promise<ActionResult> {
  try {
    await requireOwner();
    const supabase = await createClient();

    // Check count first
    const { count, error: countError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (countError) {
      return { error: countError.message };
    }

    if (count && count > 0) {
      return { error: `Database already contains ${count} products. Skipping import to protect existing data.` };
    }

    const rowsToInsert = ALL_PRODUCTS.map((p) => ({
      name: p.name,
      slug: p.slug,
      category: p.category || "shirts",
      category_name: p.categoryName || "Shirts",
      price: p.price,
      compare_at_price: p.compareAtPrice || null,
      image: p.image,
      on_sale: p.onSale,
      is_new_arrival: Boolean(p.isNewArrival),
      description: p.description || null,
      in_stock: p.inStock !== false,
      sizes: p.sizes ? [...p.sizes] : [],
    }));

    const { error: insertError } = await supabase.from("products").insert(rowsToInsert);

    if (insertError) {
      return { error: insertError.message };
    }

    purgeStoreCache();
    return { success: true };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to import initial products",
    };
  }
}
