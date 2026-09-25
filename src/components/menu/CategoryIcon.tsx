import "./CategoryIcon.css";
import {
  Beef,
  CakeSlice,
  CupSoda,
  Drumstick,
  Fish,
  Pizza,
  Soup,
} from "lucide-react";

export function CategoryIcon({
  name,
  size = 30,
  icon,
}: {
  name: string;
  size?: number;
  icon?: string;
}) {
  if (icon)
    return (
      <span className="category-emoji-icon" style={{ fontSize: size * 0.9 }}>
        {icon}
      </span>
    );
  const iconMap = {
    Pizza,
    Beef,
    Soup,
    Fish,
    CakeSlice,
    CupSoda,
    Drumstick,
  } as Record<string, typeof Pizza>;
  const iconName =
    name === "Pizza"
      ? "Pizza"
      : name === "Burgers"
        ? "Beef"
        : name === "Pasta"
          ? "Soup"
          : name === "Chicken"
            ? "Drumstick"
            : name === "Desserts"
              ? "CakeSlice"
              : name === "Beverages"
                ? "CupSoda"
                : name === "Fries"
                  ? "CupSoda"
                  : name === "Sandwiches"
                    ? "Beef"
                    : "CupSoda";
  const Icon = iconMap[iconName];
  return <Icon size={size} strokeWidth={1.8} />;
}
