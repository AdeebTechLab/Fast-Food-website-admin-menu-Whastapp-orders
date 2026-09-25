import "./Categories.css";
import { ArrowRight } from "lucide-react";
import { CategoryIcon } from "../menu/CategoryIcon";
import type { Category, Dish } from "../../types";

export function Categories({ products, categories, onCategory, onAll }: { products: Dish[]; categories: Category[]; onCategory: (c: string) => void; onAll: () => void }) {
  return <section id="categories" className="section"><div className="section-heading"><h2>Explore Categories</h2><button onClick={onAll}>View all categories <ArrowRight size={17} /></button></div><div className="category-grid">
    {categories.map((c) => <button className="category-card" key={c.name} onClick={() => onCategory(c.name)}>
      <span className="category-large-icon"><CategoryIcon name={c.name} size={34} icon={c.icon} /></span><strong>{c.name}</strong><small>{products.filter((d) => d.category === c.name).length} Items</small>
    </button>)}
  </div></section>;
}
