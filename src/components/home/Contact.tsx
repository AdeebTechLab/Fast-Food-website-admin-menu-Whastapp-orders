import "./Contact.css";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, MessageCircle, Phone, Star } from "lucide-react";
import type { ContactDetails, Review } from "../../types";

export function Contact({ reviews, contactDetails, onAddReview }: { reviews: Review[]; contactDetails: ContactDetails; onAddReview: (r: Review) => void }) {
  const [form, setForm] = useState({ name: "", rating: "", text: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.rating) next.rating = "Please select a rating.";
    if (!form.text.trim()) next.text = "Please write your review.";
    setErrors(next);
    if (Object.keys(next).length) return;
    onAddReview({ id: Date.now(), name: form.name.trim(), rating: Number(form.rating), text: form.text.trim(), createdAt: new Date().toISOString().slice(0, 10) });
    setForm({ name: "", rating: "", text: "" });
    setErrors({});
  };

  return <section id="contact" className="contact-section">
    <div className="contact-heading"><p className="script">We're Here For You</p><h2>Contact & Reviews</h2><p>Share your experience or contact BiteHub directly.</p></div>
    <div className="contact-review-layout">
      <form className="review-form" onSubmit={submit} noValidate>
        <h3>Leave a Review</h3><p>Your review will appear in our customer reviews.</p>
        <label>Your Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />{errors.name && <small className="field-error">{errors.name}</small>}</label>
        <label>Rating<select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}><option value="">Select rating</option>{[5,4,3,2,1].map((n)=><option key={n} value={n}>{n} Stars</option>)}</select>{errors.rating && <small className="field-error">{errors.rating}</small>}</label>
        <label>Your Review<textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Tell us about your experience..." />{errors.text && <small className="field-error">{errors.text}</small>}</label>
        <button className="checkout" type="submit"><Star size={17}/> Submit Review</button>
      </form>
      <div className="contact-side">
        <a className="contact-card" href={contactDetails.whatsapp ? `https://wa.me/${contactDetails.whatsapp.replace(/\D/g, "")}` : "#"} target="_blank" rel="noreferrer"><div className="contact-icon"><MessageCircle /></div><div><strong>WhatsApp</strong><span>{contactDetails.whatsapp || "Not available"}</span><small>Chat with us instantly</small></div><ArrowUpRight /></a>
        <a className="contact-card" href={contactDetails.phone ? `tel:+${contactDetails.phone.replace(/\D/g, "")}` : "#"}><div className="contact-icon"><Phone /></div><div><strong>Phone</strong><span>{contactDetails.phone || "Not available"}</span><small>Available 24/7</small></div><ArrowUpRight /></a>
        <a className="contact-card" href={contactDetails.email ? `mailto:${contactDetails.email}` : "#"}><div className="contact-icon"><Mail /></div><div><strong>Email</strong><span>{contactDetails.email || "Not available"}</span><small>Send us an email</small></div><ArrowUpRight /></a>
        <div className="mini-review-list"><strong>Latest Reviews</strong>{reviews.slice(0,3).map((r)=><div key={r.id}><span>{r.name}</span><b>{"★".repeat(r.rating)}</b></div>)}</div>
      </div>
    </div>
  </section>;
}
