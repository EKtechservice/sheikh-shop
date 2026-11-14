import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sheikhsshop.com"),
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [
      { url: "/images/hero-shirt.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sheikh's Shop",
  },
  formatDetection: {
    telephone: false,
  },
  title: {
    default: "Sheikh's Shop | Modern Menswear",
    template: "%s | Sheikh's Shop",
  },
  description:
    "Curated modern menswear, timeless tailoring, and refined essentials for the contemporary gentleman.",
  keywords: [
    "menswear",
    "mens fashion",
    "Oxford shirts",
    "linen polos",
    "denim jeans",
    "tailoring",
    "luxury essentials",
    "Sheikh's Shop",
  ],
  authors: [{ name: "Sheikh's Shop" }],
  creator: "Sheikh's Shop",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sheikhsshop.com",
    siteName: "Sheikh's Shop",
    title: "Sheikh's Shop | Modern Menswear",
    description:
      "Curated modern menswear, timeless tailoring, and refined essentials for the contemporary gentleman.",
    images: [
      {
        url: "/images/hero-shirt.jpg",
        width: 1200,
        height: 630,
        alt: "Sheikh's Shop Luxury Menswear Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheikh's Shop | Modern Menswear",
    description:
      "Curated modern menswear, timeless tailoring, and refined essentials for the contemporary gentleman.",
    images: ["/images/hero-shirt.jpg"],
    creator: "@sheikhsshop",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD) for Search Engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "Sheikh's Shop",
    description:
      "Curated modern menswear, timeless tailoring, and refined essentials for the contemporary gentleman.",
    url: "https://sheikhsshop.com",
    logo: "https://sheikhsshop.com/images/categories/shirts.png",
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Credit Card, Apple Pay, Google Pay",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://sheikhsshop.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} scroll-smooth antialiased`}
    >
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/images/hero-shirt.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen min-h-[100dvh] bg-white font-sans text-brand-black antialiased selection:bg-tan/20 selection:text-navy overflow-x-hidden">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
