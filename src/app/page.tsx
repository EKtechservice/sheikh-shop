import React from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroCategories from "@/components/HeroCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChoose from "@/components/WhyChoose";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
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
