/**
 * Centralized Store and WhatsApp Configuration for Sheikh's Shop
 */
export const STORE_CONFIG = {
  name: "Sheikh's Shop",
  tagline: "Modern Menswear & Timeless Tailoring",
  // Owner WhatsApp phone number in international format (without +, spaces or dashes)
  // Owner WhatsApp: 0593684022 -> 233593684022
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233593684022",
  currency: "$",
  email: "orders@sheikhsshop.com",
  phoneDisplay: "+233 59 368 4022",
  phoneRaw: "0593684022",
  location: "Akyem New Tafo, Ghana",
  freePickupAddress: "Sheikh Trading Enterprise Store, Akyem New Tafo, Ghana",
};

export interface OrderItemPayload {
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface CustomerOrderDetails {
  fullName: string;
  phone: string;
  deliveryMethod: "pickup" | "delivery";
  deliveryAddress?: string;
  notes?: string;
  items: readonly OrderItemPayload[];
  totalPrice: number;
  deliveryFee: number;
}

/**
 * Builds a beautifully formatted WhatsApp message and returns the direct wa.me link
 */
export function buildWhatsAppOrderLink(order: CustomerOrderDetails): string {
  let cleanPhone = STORE_CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
  if (cleanPhone.startsWith("0") && cleanPhone.length === 10) {
    cleanPhone = "233" + cleanPhone.slice(1);
  }

  const itemsList = order.items
    .map((item, index) => {
      const sizeText = item.size ? ` (Option: ${item.size})` : "";
      const itemTotal = (item.price * item.quantity).toFixed(2);
      return `${index + 1}. *${item.name}*${sizeText}%0A   Qty: ${item.quantity} x $${item.price.toFixed(2)} = *$${itemTotal}*`;
    })
    .join("%0A%0A");

  const grandTotal = (order.totalPrice + order.deliveryFee).toFixed(2);

  const deliveryText =
    order.deliveryMethod === "pickup"
      ? "🏪 Free Store Pickup (Order Online, Pick Up Today)"
      : `🚚 Nationwide Courier Delivery across Ghana ($${order.deliveryFee.toFixed(2)})`;

  const addressBlock =
    order.deliveryMethod === "delivery" && order.deliveryAddress
      ? `%0A📍 *Delivery Address:* ${encodeURIComponent(order.deliveryAddress)}`
      : "";

  const notesBlock = order.notes
    ? `%0A📝 *Customer Notes:* ${encodeURIComponent(order.notes)}`
    : "";

  const message =
    `*🛍️ NEW ORDER - SHEIKH'S SHOP*%0A` +
    `--------------------------------------%0A` +
    `*👤 Customer Details:*%0A` +
    `• Name: *${encodeURIComponent(order.fullName)}*%0A` +
    `• Phone: *${encodeURIComponent(order.phone)}*%0A` +
    `• Method: *${deliveryText}*` +
    addressBlock +
    notesBlock +
    `%0A%0A--------------------------------------%0A` +
    `*📦 Ordered Items:*%0A%0A` +
    itemsList +
    `%0A%0A--------------------------------------%0A` +
    `*Subtotal:* $${order.totalPrice.toFixed(2)}%0A` +
    (order.deliveryFee > 0
      ? `*Delivery Fee:* $${order.deliveryFee.toFixed(2)}%0A`
      : "") +
    `*💰 Total Amount:* *$${grandTotal}*%0A` +
    `--------------------------------------%0A` +
    `Hello Sheikh's Shop, I just placed this order on your website. Please confirm availability and send me payment details. Thank you!`;

  return `https://wa.me/${cleanPhone}?text=${message}`;
}
