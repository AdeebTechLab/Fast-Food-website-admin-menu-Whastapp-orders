import "./Reviews.css";
import { Star } from "lucide-react";
import type { Review } from "../../types";

export function Reviews({ reviews }: { reviews: Review[] }) { return <section className="reviews-section"><div className="section-heading"><div><p className="eyebrow">CUSTOMER LOVE</p><h2>What Our Customers Say</h2></div><div className="overall-rating"><Star fill="currentColor" /> 4.8 / 5</div></div><div className="reviews-grid">{reviews.slice(0, 3).map((r) => <article className="review-card" key={r.id}><div className="review-stars">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div><p>“{r.text}”</p><strong>{r.name}</strong><small>Verified customer</small></article>)}</div></section>; }
