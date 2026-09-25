import "./Offers.css";
import { MenuPage } from "../components/menu/MenuPage";
import type { Category, Dish } from "../types";

export function Offers({ categories, dishes, onViewDetails, addToCart }: { categories: Category[]; dishes: Dish[]; onViewDetails: (dish: Dish) => void; addToCart: (dish: Dish, size?: string) => void }) {
  return <div className="offers-route-page"><MenuPage title="Hot Offers" subtitle="Fresh deals and special dishes selected by BiteHub." categories={categories} dishes={dishes} activeCategory="All" setCategory={() => undefined} addToCart={addToCart} onAll={() => undefined} onViewDetails={onViewDetails} offersOnly /></div>;
}
