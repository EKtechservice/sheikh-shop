import { createClient } from "@/lib/supabase/server";
import { ALL_PRODUCTS, type Product } from "@/data/products";

// Database row representation matching Supabase public.products table
export interface DbProductRow {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  category_name: string | null;
  price: number;
  compare_at_price: number | null;
  image: string;
  on_sale: boolean;
  is_new_arrival: boolean;
  description: string | null;
  in_stock: boolean;
  sizes: string[] | null;
  created_at?: string;
  updated_at?: string;
}

// Convert Database row to standard Product interface
export function mapRowToProduct(row: DbProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category ?? undefined,
    categoryName: row.category_name ?? undefined,
    price: Number(row.price),
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : undefined,
    image: row.image,
    onSale: Boolean(row.on_sale),
    isNewArrival: Boolean(row.is_new_arrival),
    description: row.description ?? undefined,
    inStock: Boolean(row.in_stock),
    sizes: row.sizes && row.sizes.length > 0 ? row.sizes : undefined,
  };
}

/**
 * Fetch all products from Supabase.
 * If database is empty or unreachable during build/offline, gracefully falls back to ALL_PRODUCTS.
 */
export async function getLiveProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return [...ALL_PRODUCTS];
    }

    return (data as DbProductRow[]).map(mapRowToProduct);
  } catch {
    return [...ALL_PRODUCTS];
  }
}

/**
 * Fetch products by category slug
 */
export async function getLiveProductsByCategory(categorySlug: string): Promise<Product[]> {
  const all = await getLiveProducts();
  return all.filter(
    (p) => p.category?.toLowerCase() === categorySlug.toLowerCase()
  );
}

/**
 * Fetch single product by slug
 */
export async function getLiveProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await getLiveProducts();
  return all.find((p) => p.slug === slug);
}

/**
 * Fetch new arrivals
 */
export async function getLiveNewArrivals(): Promise<Product[]> {
  const all = await getLiveProducts();
  return all.filter((p) => p.isNewArrival);
}

/**
 * Fetch sale products
 */
export async function getLiveSaleProducts(): Promise<Product[]> {
  const all = await getLiveProducts();
  return all.filter((p) => p.onSale);
}

/**
 * Fetch preorder / gadgets products
 */
export async function getLivePreorderProducts(): Promise<Product[]> {
  const all = await getLiveProducts();
  return all.filter((p) => p.category?.toLowerCase() === "preorder");
}
