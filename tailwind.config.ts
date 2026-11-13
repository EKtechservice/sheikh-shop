import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-black": "#0A0A0A",
        navy: "#1B2A4A",
        "navy-dark": "#141F38",
        tan: "#B98B63",
        "surface-gray": "#F0F0F0",
        "footer-black": "#0D1016",
        "footer-bottom": "#141A26",
        "sale-red": "#D9534F",
        "text-muted": "#4B5563",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        logo: ["var(--font-cormorant)", "serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
