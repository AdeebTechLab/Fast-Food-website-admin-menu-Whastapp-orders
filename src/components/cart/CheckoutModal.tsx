import "./CheckoutModal.css";
import { useState, type FormEvent } from "react";
import { Check, CreditCard, X } from "lucide-react";
import { cartKey, formatPrice, getDiscountedPrice } from "../../utils/price";
import { createWhatsAppMessage, createWhatsAppUrl } from "../../utils/whatsapp";
import type { CartItem, Customer } from "../../types";

type Props = {
  cart: CartItem[];
  total: number;
  whatsappNumber: string;
  onClose: () => void;
  onSuccess: () => void;
  placeOrder: (customer: Customer, payment: string) => void;
};

export function CheckoutModal({
  cart,
  total,
  whatsappNumber,
  onClose,
  onSuccess,
  placeOrder,
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    payment: "Cash on Delivery",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    if (!form.address.trim()) next.address = "Delivery address is required.";
    if (!form.payment.trim()) next.payment = "Please select a payment method.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const customer: Customer = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
    };
    placeOrder(customer, form.payment);
    const message = createWhatsAppMessage(cart, total, customer, form.payment);
    if (whatsappNumber.trim())
      window.open(
        createWhatsAppUrl(message, whatsappNumber),
        "_blank",
        "noopener,noreferrer",
      );
    setSubmitted(true);
  };

  if (submitted)
    return (
      <div className="modal-overlay">
        <div className="success-modal">
          <div className="success-icon">
            <Check />
          </div>
          <h2>Order Confirmed!</h2>
          <p>
            Your order has been saved and your WhatsApp order message has been
            prepared.
          </p>
          <button className="btn btn-orange" onClick={onSuccess}>
            Back to Menu
          </button>
        </div>
      </div>
    );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <p className="script">Almost Done</p>
            <h2>Checkout</h2>
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={submit} noValidate>
            <label>
              Full Name
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your full name"
              />
              {errors.name && (
                <small className="field-error">{errors.name}</small>
              )}
            </label>
            <label>
              Phone Number
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="03xx-xxxxxxx"
              />
              {errors.phone && (
                <small className="field-error">{errors.phone}</small>
              )}
            </label>
            <label>
              Email <span className="optional-label">(Optional)</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Delivery Address
              <textarea
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="Complete delivery address"
              />
              {errors.address && (
                <small className="field-error">{errors.address}</small>
              )}
            </label>
            <label>
              Payment Method
              <select
                value={form.payment}
                onChange={(e) => update("payment", e.target.value)}
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Pay at Pickup">Pay at Pickup</option>
              </select>
              {errors.payment && (
                <small className="field-error">{errors.payment}</small>
              )}
            </label>
            <button className="checkout" type="submit">
              <CreditCard size={18} /> Place Order — {formatPrice(total)}
            </button>
          </form>
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.map((i) => (
              <div className="summary-row" key={cartKey(i)}>
                <span>
                  {i.name}
                  {i.selectedSize ? ` (${i.selectedSize})` : ""} × {i.quantity}
                </span>
                <b>{formatPrice(getDiscountedPrice(i) * i.quantity)}</b>
              </div>
            ))}
            <div className="summary-total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
