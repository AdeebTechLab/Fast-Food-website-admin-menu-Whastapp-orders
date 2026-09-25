import type { CartItem, Customer } from "../types";
import { formatPrice, getDiscountedUnitPrice } from "./price";

export const normalizePhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("03")) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return phone.trim();
};

export const createWhatsAppMessage = (cart: CartItem[], total: number, customer: Customer, payment: string) => {
  const lines = cart.map((item) => {
    const size = item.selectedSize ? ` (${item.selectedSize})` : "";
    return `• ${item.name}${size} ×${item.quantity} — ${formatPrice(getDiscountedUnitPrice(item) * item.quantity)}`;
  }).join("\n");

  return `Hello BiteHub, I'd like to place an order.\n\nOrder Items:\n${lines}\n\nTotal: ${formatPrice(total)}\n\nDelivery Details:\nName: ${customer.name}\nPhone: ${normalizePhone(customer.phone)}\nAddress: ${customer.address}\n\nPayment Method: ${payment}`;
};

export const createWhatsAppUrl = (message: string, whatsappNumber: string) => {
  const digits = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
};
