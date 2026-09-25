import "./Promo.css";
import { Heart } from "lucide-react";

export function Promo({ onOrder }: { onOrder: () => void }) {
  return (
    <section className="promo">
      <div className="promo-bag">🛍️</div>
      <div>
        <small>HUNGRY? WE'VE GOT YOU!</small>
        <h2>Get 20% OFF</h2>
        <p>
          On Your First Order <Heart size={18} />
        </p>
      </div>
      <button onClick={onOrder}>
        <span>
          Use Code: <b>WELCOME20</b>
        </span>
        <small>Valid on orders over PKR 3,000</small>
      </button>
    </section>
  );
}
