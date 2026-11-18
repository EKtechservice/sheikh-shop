-- =====================================================================
-- Sheikh's Shop: Supabase Database & Storage Setup (Stage 1)
-- =====================================================================
-- Dedicated Store Owner Account: wyflic@gmail.com
-- Supabase Project: kokglhfpyzrluvwgvbjg
-- =====================================================================

-- 1. Create the "products" table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT,
  category_name TEXT,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  compare_at_price NUMERIC(10, 2) CHECK (compare_at_price >= 0),
  image TEXT NOT NULL,
  back_image TEXT,
  on_sale BOOLEAN NOT NULL DEFAULT false,
  is_new_arrival BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  sizes TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at DESC);

-- Automatic updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_products_updated_at ON public.products;
CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================================
-- 2. Row Level Security (RLS) on "products" Table
-- =====================================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Rule A: Anyone (including unauthenticated visitors) can view products
DROP POLICY IF EXISTS "Public products are viewable by everyone" ON public.products;
CREATE POLICY "Public products are viewable by everyone"
  ON public.products
  FOR SELECT
  USING (true);

-- Rule B: ONLY wyflic@gmail.com can insert new products
DROP POLICY IF EXISTS "Only owner can insert products" ON public.products;
CREATE POLICY "Only owner can insert products"
  ON public.products
  FOR INSERT
  WITH CHECK (
    (auth.jwt() ->> 'email') = 'wyflic@gmail.com'
  );

-- Rule C: ONLY wyflic@gmail.com can update products and prices
DROP POLICY IF EXISTS "Only owner can update products" ON public.products;
CREATE POLICY "Only owner can update products"
  ON public.products
  FOR UPDATE
  USING (
    (auth.jwt() ->> 'email') = 'wyflic@gmail.com'
  )
  WITH CHECK (
    (auth.jwt() ->> 'email') = 'wyflic@gmail.com'
  );

-- Rule D: ONLY wyflic@gmail.com can delete products
DROP POLICY IF EXISTS "Only owner can delete products" ON public.products;
CREATE POLICY "Only owner can delete products"
  ON public.products
  FOR DELETE
  USING (
    (auth.jwt() ->> 'email') = 'wyflic@gmail.com'
  );

-- =====================================================================
-- 3. Storage Bucket for Product Images
-- =====================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  2097152, -- 2 MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 2097152,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- Storage Rule A: Public can view images
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
CREATE POLICY "Public can view product images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'product-images');

-- Storage Rule B: ONLY wyflic@gmail.com can upload images
DROP POLICY IF EXISTS "Only owner can upload product images" ON storage.objects;
CREATE POLICY "Only owner can upload product images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images'
    AND (auth.jwt() ->> 'email') = 'wyflic@gmail.com'
  );

-- Storage Rule C: ONLY wyflic@gmail.com can update images
DROP POLICY IF EXISTS "Only owner can update product images" ON storage.objects;
CREATE POLICY "Only owner can update product images"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'product-images'
    AND (auth.jwt() ->> 'email') = 'wyflic@gmail.com'
  );

-- Storage Rule D: ONLY wyflic@gmail.com can delete images
DROP POLICY IF EXISTS "Only owner can delete product images" ON storage.objects;
CREATE POLICY "Only owner can delete product images"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'product-images'
    AND (auth.jwt() ->> 'email') = 'wyflic@gmail.com'
  );
