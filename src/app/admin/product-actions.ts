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
});

export interface ActionResult {
  success?: boolean;
  error?: string;
  data?: unknown;
}

function purgeStoreCache() {
  try {
    revalidatePath("/");
    revalidatePath("/categories");
    revalidatePath("/categories/[slug]", "page");
    revalidatePath("/products/[slug]", "page");
    revalidatePath("/new-arrivals");
    revalidatePath("/sale");
    revalidatePath("/preorder");
    revalidatePath("/search");
    revalidatePath("/admin");
  } catch (err) {
    console.error("Cache revalidation error:", err);
  }
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
      return { products: [], error: error.message };
    }

    return { products: (data as DbProductRow[]).map(mapRowToProduct) };
  } catch (err) {
    return {
      products: [],
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

    // Handle Image Upload
    let imageUrl = "/images/categories/shirts-v2.png"; // Fallback default
    const imageFile = formData.get("imageFile") as File | null;

    if (imageFile && imageFile.size > 0) {
      // Validate max 2MB
      if (imageFile.size > 2 * 1024 * 1024) {
        return { error: "Image file exceeds 2MB limit. Please upload a smaller image." };
      }

      // Validate allowed mime types
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(imageFile.type)) {
        return { error: "Only JPG, PNG, and WebP images are allowed." };
      }

      const fileExt = imageFile.type.split("/")[1] || "jpg";
      const fileName = `${crypto.randomUUID().slice(0, 12)}-${validData.slug || "item"}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, imageFile, {
          contentType: imageFile.type,
          upsert: true,
        });

      if (uploadError) {
        return { error: `Failed to upload image: ${uploadError.message}` };
      }

      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(uploadData.path);

      imageUrl = publicUrlData.publicUrl;
    } else {
      const manualUrl = formData.get("imageUrl")?.toString();
      if (manualUrl?.trim()) {
        imageUrl = manualUrl.trim();
      }
    }

    // Insert into Supabase products table
    const { data: inserted, error: insertError } = await supabase
      .from("products")
      .insert({
        name: validData.name,
        slug: validData.slug || slugify(validData.name),
        category: validData.category,
        category_name: validData.categoryName,
        price: validData.price,
        compare_at_price: validData.compareAtPrice ?? null,
        image: imageUrl,
        description: validData.description || null,
        in_stock: validData.inStock,
        on_sale: validData.onSale,
        is_new_arrival: validData.isNewArrival,
        sizes: validData.sizes,
      })
      .select()
      .single();

    if (insertError) {
      if (insertError.code === "23505") {
        return { error: `A product with the slug "${validData.slug}" already exists. Please pick a unique name or slug.` };
      }
      return { error: insertError.message };
    }

    purgeStoreCache();
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

    // Handle optional new image upload
    const imageFile = formData.get("imageFile") as File | null;
    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > 2 * 1024 * 1024) {
        return { error: "Image file exceeds 2MB limit. Please upload a smaller image." };
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(imageFile.type)) {
        return { error: "Only JPG, PNG, and WebP images are allowed." };
      }

      const fileExt = imageFile.type.split("/")[1] || "jpg";
      const fileName = `${crypto.randomUUID().slice(0, 12)}-${validData.slug || "item"}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, imageFile, {
          contentType: imageFile.type,
          upsert: true,
        });

      if (uploadError) {
        return { error: `Failed to upload image: ${uploadError.message}` };
      }

      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(uploadData.path);

      imageUrl = publicUrlData.publicUrl;
    }

    const { error: updateError } = await supabase
      .from("products")
      .update({
        name: validData.name,
        slug: validData.slug || slugify(validData.name),
        category: validData.category,
        category_name: validData.categoryName,
        price: validData.price,
        compare_at_price: validData.compareAtPrice ?? null,
        image: imageUrl,
        description: validData.description || null,
        in_stock: validData.inStock,
        on_sale: validData.onSale,
        is_new_arrival: validData.isNewArrival,
        sizes: validData.sizes,
      })
      .eq("id", productId);

    if (updateError) {
      return { error: updateError.message };
    }

    purgeStoreCache();
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
