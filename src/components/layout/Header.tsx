import "./Header.css";
import {
  ChevronDown,
  Menu as MenuIcon,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import type { Page } from "../../types";

export type HeaderProps = {
  page: Page;
  mobileMenu: boolean;
  setMobileMenu: (value: boolean) => void;
  onCart: () => void;
  goHome: () => void;
  openMenu: (category?: string) => void;
  openOffers: () => void;
  scrollTo: (id: string) => void;
  search: string;
  setSearch: (value: string) => void;
};

export function Header({
  page,
  mobileMenu,
  setMobileMenu,
  onCart,
  goHome,
  openMenu,
  openOffers,
  scrollTo,
  search,
  setSearch,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="nav-wrap">
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle menu"
        >
          {mobileMenu ? <X /> : <MenuIcon />}
        </button>
        <button className="brand brand-button" onClick={goHome}>
          <div className="brand-icon">☂</div>
          <div>
            <strong>
              Bite<span>Hub</span>
            </strong>
            <small>RESTAURANT</small>
          </div>
        </button>
        <nav className={mobileMenu ? "nav open" : "nav"}>
          <button className={page === "home" ? "active" : ""} onClick={goHome}>
            Home
          </button>
          <button
            className={page === "menu" ? "active" : ""}
            onClick={() => openMenu()}
          >
            Menu
          </button>
          <button onClick={() => scrollTo("categories")}>
            Categories <ChevronDown size={14} />
          </button>
          <button
            className={page === "offers" ? "active" : ""}
            onClick={openOffers}
          >
            Offers
          </button>
          <button onClick={() => scrollTo("how")}>About Us</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
        </nav>
        <div className="nav-actions">
          <div className="search-box">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && openMenu()}
              placeholder="Search for burgers, pizza, pasta..."
              aria-label="Search dishes"
            />
            {search.trim() && (
              <button
                className="search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
