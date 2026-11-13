export interface Category {
  readonly name: string;
  readonly slug: string;
  readonly image: string;
  readonly onSale: boolean;
}

export const CATEGORIES: readonly Category[] = [
  {
    name: "Shirts",
    slug: "shirts",
    image: "/images/categories/shirts-v2.png",
    onSale: true,
  },
  {
    name: "Polo Shirts",
    slug: "polo-shirts",
    image: "/images/categories/polo-shirts-v2.png",
    onSale: true,
  },
  {
    name: "Shorts",
    slug: "shorts",
    image: "/images/categories/shorts-v2.png",
    onSale: true,
  },
  {
    name: "Boxers",
    slug: "boxers",
    image: "/images/categories/boxers-v2.png",
    onSale: true,
  },
  {
    name: "Perfumes",
    slug: "perfumes",
    image: "/images/categories/perfumes-v2.png",
    onSale: true,
  },
  {
    name: "Jeans",
    slug: "jeans",
    image: "/images/categories/jeans-v2.png",
    onSale: true,
  },
  {
    name: "Slides",
    slug: "slides",
    image: "/images/categories/slides-v2.png",
    onSale: true,
  },
  {
    name: "Combo Deals",
    slug: "combo-deals",
    image: "/images/categories/combo-deals-v2.png",
    onSale: true,
  },
  {
    name: "Birthday Gifts",
    slug: "birthday-gifts",
    image: "/images/categories/birthday-gifts-v2.png",
    onSale: true,
  },
] as const;
