-- =====================================================================
-- Run this in Supabase SQL Editor to update policies to: wyflic@gmail.com
-- =====================================================================

-- 1. Update Table Policies
DROP POLICY IF EXISTS "Only owner can insert products" ON public.products;
CREATE POLICY "Only owner can insert products"
  ON public.products
  FOR INSERT
  WITH CHECK (
    (auth.jwt() ->> 'email') = 'wyflic@gmail.com'
  );

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

DROP POLICY IF EXISTS "Only owner can delete products" ON public.products;
CREATE POLICY "Only owner can delete products"
  ON public.products
  FOR DELETE
  USING (
    (auth.jwt() ->> 'email') = 'wyflic@gmail.com'
  );

-- 2. Update Storage Policies
DROP POLICY IF EXISTS "Only owner can upload product images" ON storage.objects;
CREATE POLICY "Only owner can upload product images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images'
    AND (auth.jwt() ->> 'email') = 'wyflic@gmail.com'
  );

DROP POLICY IF EXISTS "Only owner can update product images" ON storage.objects;
CREATE POLICY "Only owner can update product images"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'product-images'
    AND (auth.jwt() ->> 'email') = 'wyflic@gmail.com'
  );

DROP POLICY IF EXISTS "Only owner can delete product images" ON storage.objects;
CREATE POLICY "Only owner can delete product images"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'product-images'
    AND (auth.jwt() ->> 'email') = 'wyflic@gmail.com'
  );
