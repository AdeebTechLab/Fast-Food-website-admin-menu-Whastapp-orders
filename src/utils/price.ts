import type { CartItem, Dish } from "../types";

export const getDishSizePrice = (dish: Dish, size?: string) => {
  const selected = dish.sizes?.find((item) => item.label === size);
  return selected?.price ?? dish.price;
};

export const getCartItemPrice = (item: CartItem) =>
  item.unitPrice ?? getDishSizePrice(item, item.selectedSize);
export const getDiscountedUnitPrice = (item: CartItem | Dish) =>
  Math.max(
    0,
    getCartItemPrice(item as CartItem) * (1 - (item.discount ?? 0) / 100),
  );
export const getDiscountedPrice = (item: CartItem | Dish) =>
  getDiscountedUnitPrice(item);
export const formatPrice = (price: number) =>
  `Rs ${price.toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const getCartTotal = (cart: CartItem[]) =>
  cart.reduce(
    (sum, item) => sum + getDiscountedUnitPrice(item) * item.quantity,
    0,
  );
export const cartKey = (item: CartItem) =>
  `${item.id}-${item.selectedSize ?? "default"}`;
