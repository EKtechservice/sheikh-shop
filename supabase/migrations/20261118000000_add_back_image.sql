-- =====================================================================
-- Migration: Add back_image column to public.products table
-- Allows storing front and back views of products for Sheikh's Shop
-- =====================================================================

ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS back_image TEXT;

COMMENT ON COLUMN public.products.back_image IS 'Public URL of the back / reverse angle photo of the product';
