export interface Category {
  readonly name: string;
  readonly slug: string;
  readonly image: string;
  readonly onSale: boolean;
  readonly tagline?: string;
  readonly description?: string;
}

export const CATEGORIES: readonly Category[] = [
  {
    name: "Shirts",
    slug: "shirts",
    image: "/images/categories/shirts-v2.png",
    onSale: true,
    tagline: "Tailored Elegance & Timeless Cuts",
    description: "Discover our refined collection of premium long-staple cotton shirts, crisp formal collars, and relaxed casual button-downs.",
  },
  {
    name: "Polo Shirts",
    slug: "polo-shirts",
    image: "/images/categories/polo-shirts-v2.png",
    onSale: true,
    tagline: "Breezy French Flax & Mercerized Knit",
    description: "Effortless resort style and smart-casual luxury. Breathable linen polos and mercerized cotton knits tailored for a modern fit.",
  },
  {
    name: "Hoodies",
    slug: "hoodies",
    image: "/images/categories/hoodies-v2.png",
    onSale: true,
    tagline: "Heavyweight Fleece & Tailored Streetwear",
    description: "Ultra-comfortable premium heavyweight cotton hoodies with double-lined hoods, ribbed trims, and clean modern silhouettes.",
  },
  {
    name: "Joggers",
    slug: "joggers",
    image: "/images/categories/joggers-v2.png",
    onSale: true,
    tagline: "Tailored Tech Fleece & Relaxed Luxury Loungewear",
    description: "Sleek tapered fit sweatpants and luxury tech fleece joggers with metal-tipped drawstrings, secure pockets, and all-day comfort.",
  },
  {
    name: "Shorts",
    slug: "shorts",
    image: "/images/categories/shorts-v2.png",
    onSale: true,
    tagline: "Tailored Linen & Lightweight Chino",
    description: "Warm-weather versatility with tailored linen shorts, stretch chino silhouettes, and relaxed drawstring leisure cuts.",
  },
  {
    name: "Boxers",
    slug: "boxers",
    image: "/images/categories/boxers-v2.png",
    onSale: true,
    tagline: "Pure Micromodal & Bamboo Comfort",
    description: "The foundation of daily luxury. Experience ultra-breathable micromodal, anti-chafing seams, and plush microfiber waistbands.",
  },
  {
    name: "Perfumes",
    slug: "perfumes",
    image: "/images/categories/perfumes-v2.png",
    onSale: true,
    tagline: "Exotic OUD, Royal Ambergris & Fine Cologne",
    description: "Signature fragrances crafted with rich aromatic oils, woody base notes, and long-lasting sillage designed for discerning gentlemen.",
  },
  {
    name: "Jeans",
    slug: "jeans",
    image: "/images/categories/jeans-v2.png",
    onSale: true,
    tagline: "Japanese Selvedge & Slim Stretch Denim",
    description: "Architectural cuts and artisan washes. From raw deep indigo selvedge to stay-black performance stretch denim.",
  },
  {
    name: "Slides",
    slug: "slides",
    image: "/images/categories/slides-v2.png",
    onSale: true,
    tagline: "Contoured Comfort & Luxury Slip-On Footwear",
    description: "Ergonomic molded sole slides, textured straps, and waterproof casual footwear engineered for maximum arch support and effortless style.",
  },
  {
    name: "Combo Deals",
    slug: "combo-deals",
    image: "/images/categories/combo-deals-v2.png",
    onSale: true,
    tagline: "Curated Wardrobe Bundles with Exclusive Savings",
    description: "Shop matched outfits, essential trios, and grooming sets bundled together with instant price discounts.",
  },
  {
    name: "Birthday Gifts",
    slug: "birthday-gifts",
    image: "/images/categories/birthday-gifts-v2.png",
    onSale: true,
    tagline: "Deluxe Black-Box Gift Hampers for Him",
    description: "Take the guesswork out of gifting. Ready-to-gift presentation hampers featuring polo shirts, signature perfumes, and elegant packaging.",
  },
  {
    name: "Preorder Gadgets",
    slug: "preorder",
    image: "/images/categories/combo-deals-banner.png",
    onSale: true,
    tagline: "Flagship Smartphones, Pro Laptops & Premium Audio",
    description: "Lock in your preorders for the latest electronic gadgets, flagship phones, and pro gear with guaranteed express nationwide delivery.",
  },
] as const;

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase()
  );
}
