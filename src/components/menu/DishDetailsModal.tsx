import "./DishDetailsModal.css";
import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import { formatPrice, getDishSizePrice } from "../../utils/price";
import type { Dish } from "../../types";

export function DishDetailsModal({ dish, onClose, addToCart }: { dish: Dish; onClose: () => void; addToCart: (d: Dish, size?: string) => void }) {
  const [selectedSize, setSelectedSize] = useState(dish.sizes?.[1]?.label ?? dish.sizes?.[0]?.label ?? "");
  const basePrice = getDishSizePrice(dish, selectedSize);
  const discounted = Math.max(0, basePrice * (1 - (dish.discount ?? 0) / 100));
  return <div className="modal-overlay" onClick={onClose}><div className="dish-details-modal" onClick={(e) => e.stopPropagation()}>
    <button className="details-close" onClick={onClose}><X /></button><img src={dish.image} alt={dish.name} />
    <div className="dish-details-content"><div className="details-meta"><span>{dish.category}</span>{dish.discount > 0 && <b>{dish.discount}% OFF</b>}</div><h2>{dish.name}</h2><p>{dish.description}</p>
      <div className="details-grid"><div><small>Ingredients</small><strong>{dish.ingredients}</strong></div><div><small>Preparation</small><strong>{dish.prepTime}</strong></div></div>
      {dish.sizes?.length ? <label className="details-size">Choose Size<select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>{dish.sizes.map((size) => <option key={size.label} value={size.label}>{size.label} — {formatPrice(size.price)}</option>)}</select></label> : null}
      <div className="details-price">{dish.discount > 0 && <del>{formatPrice(basePrice)}</del>}<strong>{formatPrice(discounted)}</strong></div>
      <button className="checkout" onClick={() => addToCart(dish, selectedSize || undefined)}><ShoppingCart size={18}/> Add to Cart</button>
    </div>
  </div></div>;
}
