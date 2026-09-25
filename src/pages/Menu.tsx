import "./Menu.css";
import { MenuPage } from "../components/menu/MenuPage";
import type { Category, Dish } from "../types";

export function Menu({ categories, dishes, activeCategory, setCategory, addToCart, onAll, onViewDetails }: {
  categories: Category[]; dishes: Dish[]; activeCategory: string; setCategory: (category: string) => void;
  addToCart: (dish: Dish, size?: string) => void; onAll: () => void; onViewDetails: (dish: Dish) => void;
}) {
  return <div className="menu-route-page"><MenuPage categories={categories} dishes={dishes} activeCategory={activeCategory} setCategory={setCategory} addToCart={addToCart} onAll={onAll} onViewDetails={onViewDetails} /></div>;
}
