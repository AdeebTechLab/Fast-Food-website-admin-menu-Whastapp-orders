import "./HowItWorks.css";
import { ArrowRight, Check, Package, Search, Truck } from "lucide-react";

type StepItem = [typeof Search, string, string];

export function HowItWorks() {
  const steps: StepItem[] = [
    [
      Search,
      "Choose Your Food",
      "Browse from a delicious variety of meals & drinks.",
    ],
    [Package, "Place Your Order", "Add to cart & place your order easily."],
    [Truck, "Fast Delivery", "We deliver hot & fresh to your doorstep."],
    [Check, "Enjoy Your Meal", "Sit back, relax & enjoy your delicious meal."],
  ];

  return (
    <section id="how" className="how">
      <h2>How It Works</h2>
      <div className="steps">
        {steps.map(([Icon, title, text], i) => (
          <div className="step-wrap" key={title}>
            <div className="step">
              <div className="step-icon">
                <Icon />
              </div>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </div>
            {i < 3 && <ArrowRight className="step-arrow" />}
          </div>
        ))}
      </div>
    </section>
  );
}
