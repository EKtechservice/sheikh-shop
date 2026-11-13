/**
 * Formats a numeric value into Ghana Cedis format (GH₵ XX.XX)
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace("GH₵", "GH₵ ");
}

/**
 * Generates an SVG shimmer effect encoded as a base64 Data URL
 * for use as next/image blurDataURL placeholders.
 */
export function generateShimmerBlur(width = 400, height = 400, baseColor = "#f1f1f1"): string {
  const shimmerSvg = `
    <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="shimmer-gradient">
          <stop stop-color="${baseColor}" offset="20%" />
          <stop stop-color="#e5e5e5" offset="50%" />
          <stop stop-color="${baseColor}" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="${baseColor}" />
      <rect id="r" width="${width}" height="${height}" fill="url(#shimmer-gradient)" />
      <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1.2s" repeatCount="indefinite" />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(shimmerSvg)}`;
}

/**
 * Pre-computed neutral shimmer for 1:1 square product & category images
 */
export const SQUARE_BLUR_DATA_URL = generateShimmerBlur(600, 600, "#f4f4f5");

/**
 * Pre-computed warm tan shimmer for the 4:5 hero backdrop
 */
export const HERO_BLUR_DATA_URL = generateShimmerBlur(800, 1000, "#c29670");
