import "./TopBar.css";
import { Headphones, Heart } from "lucide-react";

export function TopBar() {
  return (
    <div className="topbar">
      <span>🚚 Free Delivery on orders over PKR 2,500</span>
      <span className="top-center">
        Good Food, Delivering Fast <Heart size={13} fill="currentColor" />
      </span>
      <span>
        <Headphones size={14} /> 24/7 Support
      </span>
    </div>
  );
}
