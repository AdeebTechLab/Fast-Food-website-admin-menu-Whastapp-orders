import "./PopularDishes.css";
import { ArrowRight } from "lucide-react";
import { DishCard } from "../menu/DishCard";
import type { Dish } from "../../types";

export function PopularDishes({ dishes, addToCart, onViewAll, onViewDetails }: { dishes: Dish[]; addToCart: (d: Dish, size?: string) => void; onViewAll: () => void; onViewDetails: (d: Dish) => void }) {
  return <section id="popular" className="section popular"><div className="section-heading"><h2>Popular Dishes</h2><button onClick={onViewAll}>View all <ArrowRight size={17} /></button></div><div className="dish-grid">{dishes.map((d) => <DishCard key={d.id} dish={d} addToCart={addToCart} onViewDetails={onViewDetails} />)}</div></section>;
}
