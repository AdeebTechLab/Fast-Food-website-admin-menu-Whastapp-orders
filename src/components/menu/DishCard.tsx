import "./DishCard.css";
import { useState } from "react";
import { Clock3, ShoppingCart } from "lucide-react";
import { formatPrice, getDishSizePrice } from "../../utils/price";
import type { Dish } from "../../types";

export function DishCard({ dish, addToCart, onViewDetails }: { dish: Dish; addToCart: (dish: Dish, size?: string) => void; onViewDetails?: (dish: Dish) => void }) {
  const [selectedSize, setSelectedSize] = useState(dish.sizes?.[1]?.label ?? dish.sizes?.[0]?.label ?? "");
  const basePrice = getDishSizePrice(dish, selectedSize);
  const discounted = Math.max(0, basePrice * (1 - (dish.discount ?? 0) / 100));
  return <article className="dish-card">
    <button className="dish-image" onClick={() => onViewDetails?.(dish)} aria-label={`View ${dish.name} details`}>
      <img src={dish.image} alt={dish.name} /><span className="category-pill">{(dish.discount ?? 0) > 0 ? "HOT OFFER" : dish.category}</span>
      {dish.discount > 0 && <span className="discount-badge">{dish.discount}% OFF</span>}
    </button>
    <div className="dish-info"><h3>{dish.name}</h3><p>{dish.description}</p>
      {dish.sizes?.length ? <label className="size-picker">Size
        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} onClick={(e) => e.stopPropagation()}>
          {dish.sizes.map((size) => <option key={size.label} value={size.label}>{size.label} — {formatPrice(size.price)}</option>)}
        </select>
      </label> : <small className="prep"><Clock3 size={12} /> {dish.prepTime}</small>}
      <div className="dish-bottom"><div>{dish.discount > 0 && <del>{formatPrice(basePrice)}</del>}<strong>{formatPrice(discounted)}</strong></div><button onClick={() => addToCart(dish, selectedSize || undefined)} aria-label="Add to cart"><ShoppingCart size={17} /></button></div>
    </div>
  </article>;
}
