import "./OffersPreview.css";
import { ArrowRight } from "lucide-react";
import { DishCard } from "../menu/DishCard";
import type { Dish } from "../../types";

export function OffersPreview({ dishes, addToCart, onViewAll, onViewDetails }: { dishes: Dish[]; addToCart: (d: Dish, size?: string) => void; onViewAll: () => void; onViewDetails: (d: Dish) => void }) {
  return <section className="section"><div className="section-heading"><div><p className="eyebrow">SPECIAL DEALS</p><h2>Hot Offers</h2></div><button onClick={onViewAll}>View all offers <ArrowRight size={17} /></button></div><div className="dish-grid">{dishes.slice(0, 5).map((d) => <DishCard key={d.id} dish={d} addToCart={addToCart} onViewDetails={onViewDetails} />)}</div></section>;
}
