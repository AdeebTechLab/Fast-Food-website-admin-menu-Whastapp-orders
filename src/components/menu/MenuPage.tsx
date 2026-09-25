import "./MenuPage.css";
import { ArrowRight, Search } from "lucide-react";
import { CategoryIcon } from "./CategoryIcon";
import { DishCard } from "./DishCard";
import type { Category, Dish } from "../../types";

export function MenuPage({ title = "All Menu", subtitle = "Choose from all our fresh categories and dishes.", dishes, categories, activeCategory, setCategory, addToCart, onAll, onViewDetails, offersOnly = false }: { title?: string; subtitle?: string; dishes: Dish[]; categories: Category[]; activeCategory: string; setCategory: (c: string) => void; addToCart: (d: Dish, size?: string) => void; onAll: () => void; onViewDetails: (d: Dish) => void; offersOnly?: boolean }) {
  return <main className="menu-page"><div className="menu-page-head"><p className="script">BiteHub Menu</p><h1>{title}</h1><p>{subtitle}</p></div>
    {!offersOnly && <div className="menu-category-bar"><button className={activeCategory === "All" ? "selected" : ""} onClick={onAll}>All Menu</button>{categories.map((c) => <button key={c.name} className={activeCategory === c.name ? "selected" : ""} onClick={() => setCategory(c.name)}><CategoryIcon name={c.name} size={20} icon={c.icon} /> {c.name}</button>)}<button className={activeCategory === "Hot Offers" ? "selected" : ""} onClick={() => setCategory("Hot Offers")}>🔥 Hot Offers</button></div>}
    <div className="menu-results"><div className="results-title"><h2>{activeCategory === "All" ? title : activeCategory}</h2><span>{dishes.length} dishes</span></div><div className="dish-grid">{dishes.length ? dishes.map((d) => <DishCard key={d.id} dish={d} addToCart={addToCart} onViewDetails={onViewDetails} />) : <div className="no-results"><Search size={30} /><h3>No dishes found</h3><p>Try another category.</p></div>}</div></div>
  </main>;
}
