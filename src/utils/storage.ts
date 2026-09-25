import { categories as defaultCategories, dishes as defaultDishes } from "../data/defaultData";
import type { Category, ContactDetails, Dish, Order, Review } from "../types";
import { DEFAULT_CONTACT_DETAILS } from "../config";

export const PRODUCTS_KEY = "bitehub_products";
export const CATEGORIES_KEY = "bitehub_categories";
export const ORDERS_KEY = "bitehub_orders";
export const REVIEWS_KEY = "bitehub_reviews";
export const CONTACT_DETAILS_KEY = "bitehub_contact_details";

export const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) as T : fallback;
  } catch {
    return fallback;
  }
};

const normalizeCategoryName = (name: string) => {
  const value = name.trim().toLowerCase();
  if (["sandwich", "sandwiches", "sadwiches"].includes(value)) return "Sandwiches";
  if (["drink", "drinks", "beverage", "beverages"].includes(value)) return "Beverages";
  if (value === "sushi") return "Chicken";
  return name.trim();
};

const findCanonicalCategory = (name: string, available: Category[]) => {
  const normalized = normalizeCategoryName(name).toLowerCase();
  return available.find((category) => category.name.toLowerCase() === normalized)?.name ?? normalizeCategoryName(name);
};

export const getInitialCategories = (): Category[] => {
  const raw = localStorage.getItem(CATEGORIES_KEY);

  // If the key exists, it is the authoritative persisted list. This is
  // important because an intentionally deleted default category must not
  // reappear after a refresh.
  if (raw !== null) {
    try {
      const saved = JSON.parse(raw) as Category[];
      return saved
        .map((category) => ({ ...category, name: normalizeCategoryName(category.name) }))
        .filter((category) => category.name && category.name.toLowerCase() !== "sushi");
    } catch {
      return [];
    }
  }

  return defaultCategories.map((category) => ({
    ...category,
    name: normalizeCategoryName(category.name),
  }));
};

const normalizeDish = (dish: Dish): Dish => {
  const discount = Math.min(100, Math.max(0, Number(dish.discount) || 0));
  return { ...dish, discount, offer: discount > 0 };
};

export const getInitialProducts = (): Dish[] => {
  const raw = localStorage.getItem(PRODUCTS_KEY);

  // Once product data has been persisted, use it as the source of truth.
  // This prevents an admin-deleted default product from being recreated
  // automatically on the next page refresh.
  if (raw !== null) {
    try {
      const saved = JSON.parse(raw) as Dish[];
      const canonicalCategories = getInitialCategories();
      return saved.map((dish) =>
        normalizeDish({
          ...dish,
          category: findCanonicalCategory(dish.category, canonicalCategories),
        }),
      );
    } catch {
      return [];
    }
  }

  return defaultDishes.map(normalizeDish);
};

export const getInitialOrders = (): Order[] => {
  const orders = readStorage<Order[]>(ORDERS_KEY, []);
  const map: Record<string, Order["status"]> = {
    Confirmed: "Processing",
    Preparing: "Processing",
    "Out for Delivery": "Delivered",
    Cancelled: "Cancel",
  };
  return orders.map((order) => ({
    ...order,
    status: map[order.status] ?? (["Pending","Processing","Completed","Delivered","Cancel"].includes(order.status) ? order.status : "Pending"),
  }));
};
export const getInitialContactDetails = (): ContactDetails => {
  const saved = readStorage<Partial<ContactDetails>>(CONTACT_DETAILS_KEY, {});
  return { ...DEFAULT_CONTACT_DETAILS, ...saved };
};
export const getInitialReviews = (): Review[] => readStorage<Review[]>(REVIEWS_KEY, [
  { id: 1, name: "Ayesha Khan", rating: 5, text: "Amazing food and very fast delivery. The pizza was fresh and delicious!", createdAt: "2026-09-01" },
  { id: 2, name: "Hamza Ali", rating: 5, text: "Loved the burger. Everything arrived hot and perfectly packed.", createdAt: "2026-09-04" },
  { id: 3, name: "Sara Ahmed", rating: 4, text: "Great menu, reasonable prices and a very smooth ordering experience.", createdAt: "2026-09-07" },
]);

export const persist = <T,>(key: string, value: T) => localStorage.setItem(key, JSON.stringify(value));

export const migrateLegacyStorage = () => {
  const categories = getInitialCategories();
  const products = getInitialProducts();
  persist(CATEGORIES_KEY, categories);
  persist(PRODUCTS_KEY, products);
  return { categories, products };
};
