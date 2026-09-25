export type FoodSize = { label: string; price: number };
export type Category = { name: string; icon: string };

export type Dish = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients: string;
  prepTime: string;
  featured: boolean;
  offer: boolean;
  inStock: boolean;
  discount: number;
  sizes?: FoodSize[];
};

export type CartItem = Dish & { quantity: number; selectedSize?: string; unitPrice?: number };
export type Page = "home" | "menu" | "offers";
export type Customer = { name: string; phone: string; address: string; email: string };
export type OrderStatus = "Pending" | "Processing" | "Completed" | "Delivered" | "Cancel";
export type Order = { id: string; customer: Customer; items: CartItem[]; total: number; payment: string; status: OrderStatus; createdAt: string };
export type Review = { id: number; name: string; rating: number; text: string; createdAt: string };
export type ContactDetails = { whatsapp: string; phone: string; email: string };
