import "./Footer.css";
import { ArrowUpRight, Facebook, Heart, Instagram, Mail, MessageCircle, Phone, Youtube } from "lucide-react";
import { SOCIAL_LINKS } from "../../config";
import type { ContactDetails } from "../../types";

export function Footer({ categories, contactDetails, goHome, openMenu, openOffers, scrollTo, onAdmin }: { categories: { name: string; icon: string }[]; contactDetails: ContactDetails; goHome: () => void; openMenu: (c?: string) => void; openOffers: () => void; scrollTo: (id: string) => void; onAdmin: () => void }) {
  const displayPhone = contactDetails.phone || "Not available";
  const displayWhatsapp = contactDetails.whatsapp || "Not available";
  return <footer className="footer">
    <div className="footer-grid">
      <div className="footer-brand">
        <button className="brand footer-logo brand-button" onClick={goHome}><div className="brand-icon">☂</div><div><strong>Bite<span>Hub</span></strong><small>RESTAURANT</small></div></button>
        <div className="mood">Good Food <Heart size={13} fill="currentColor" /> Good Mood</div>
        <p>We serve delicious food, made with fresh ingredients, delivered to your door.</p>
        <div className="socials"><a href={SOCIAL_LINKS.facebook || "#"} target="_blank" rel="noreferrer"><Facebook /></a><a href={SOCIAL_LINKS.instagram || "#"} target="_blank" rel="noreferrer"><Instagram /></a><a href={SOCIAL_LINKS.x || "#"} target="_blank" rel="noreferrer">𝕏</a><a href={SOCIAL_LINKS.youtube || "#"} target="_blank" rel="noreferrer"><Youtube /></a></div>
      </div>
      <FooterColumn title="Quick Links" links={[["Home",goHome],["Menu",()=>openMenu()],["Categories",()=>scrollTo("categories")],["Offers",openOffers],["Contact",()=>scrollTo("contact")],["Admin",onAdmin]]} />
      <FooterColumn title="Categories" links={categories.map(c=>[c.name,()=>openMenu(c.name)] as [string,()=>void])} />
      <div className="footer-follow">
        <h4>Contact Us</h4>
        <a className="footer-contact-link" href={displayWhatsapp !== "Not available" ? `https://wa.me/${displayWhatsapp.replace(/\D/g, "")}` : "#"} target="_blank" rel="noreferrer"><MessageCircle size={15}/> {displayWhatsapp}</a>
        <a className="footer-contact-link" href={displayPhone !== "Not available" ? `tel:+${displayPhone.replace(/\D/g, "")}` : "#"}><Phone size={15}/> {displayPhone}</a>
        <a className="footer-contact-link" href={contactDetails.email ? `mailto:${contactDetails.email}` : "#"}><Mail size={15}/> {contactDetails.email || "Not available"}</a>
        <div className="tagline">Good Food<br/><i>Good Mood</i> <Heart size={20}/></div>
      </div>
    </div>
    <div className="footer-bottom"><span>© 2026 BiteHub Restaurant. All rights reserved.</span><span>Privacy Policy &nbsp; | &nbsp; Terms & Conditions</span></div>
  </footer>;
}

export function FooterColumn({ title, links }: { title: string; links: [string, () => void][] }) {
  return <div className="footer-column"><h4>{title}</h4>{links.map(([label, action])=><button key={label} onClick={action}>{label}</button>)}</div>;
}
