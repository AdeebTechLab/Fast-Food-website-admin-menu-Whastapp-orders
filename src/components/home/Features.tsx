import "./Features.css";
import { Bike, Gift, Headphones, ShieldCheck, ShoppingBag } from "lucide-react";

type FeatureItem = [typeof Bike, string, string];

export function Features() {
  const items: FeatureItem[] = [
    [Bike, "Fast Delivery", "Get your food in 30 minutes"],
    [ShieldCheck, "Best Quality", "Fresh ingredients high quality"],
    [ShoppingBag, "Best Price", "Good food at affordable prices"],
    [Headphones, "24/7 Support", "We're here for you anytime"],
    [Gift, "Exclusive Offers", "Enjoy delicious special deals"],
  ];

  return (
    <section className="features">
      {items.map(([Icon, title, text]) => (
        <div className="feature" key={title}>
          <div className="feature-icon">
            <Icon />
          </div>
          <div>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
