import React from "react";
import Header from "@/components/public/Header";
import AnnouncementBar from "@/components/public/AnnouncementBar";
import HeroCategories from "@/components/public/HeroCategories";
import FeaturedProducts from "@/components/public/FeaturedProducts";
import WhyChoose from "@/components/public/WhyChoose";
import Newsletter from "@/components/public/Newsletter";
import Footer from "@/components/public/Footer";
import { getLiveProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allProducts = await getLiveProducts();
  const featured = allProducts.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 1. Header (Black bar) */}
      <Header />

      {/* 2. Announcement Bar (Navy strip) */}
      <AnnouncementBar />

      {/* Main Landmark with Skip Link Anchor */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* 3. Hero & Categories (White section) */}
        <HeroCategories />

        {/* 4. Featured Products (Tan band) */}
        <FeaturedProducts products={featured} />

        {/* 5. Why Choose (Light gray band) */}
        <WhyChoose />

        {/* 6. Newsletter (Navy band) */}
        <Newsletter />
      </main>

      {/* 7. Footer (Dark block & bottom bar) */}
      <Footer />
    </div>
  );
}
