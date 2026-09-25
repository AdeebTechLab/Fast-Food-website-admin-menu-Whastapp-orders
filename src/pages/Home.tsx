import "./Home.css";
import { Hero } from "../components/home/Hero";
import { Features } from "../components/home/Features";
import { Categories } from "../components/home/Categories";
import { PopularDishes } from "../components/home/PopularDishes";
import { OffersPreview } from "../components/home/OffersPreview";
import { HowItWorks } from "../components/home/HowItWorks";
import { Reviews } from "../components/home/Reviews";
import { Contact } from "../components/home/Contact";
import type { Category, ContactDetails, Dish, Review } from "../types";

export function Home({ products, categories, popularDishes, offerDishes, reviews, contactDetails, onOrder, onCategory, onViewDetails, onAddReview, onViewAllMenu, onViewAllOffers, addToCart }: {
  products: Dish[]; categories: Category[]; popularDishes: Dish[]; offerDishes: Dish[]; reviews: Review[]; contactDetails: ContactDetails;
  onOrder: () => void; onCategory: (category: string) => void; onViewDetails: (dish: Dish) => void;
  onAddReview: (review: Review) => void; onViewAllMenu: () => void; onViewAllOffers: () => void; addToCart: (dish: Dish, size?: string) => void;
}) {
  return <main className="home-page">
    <Hero onOrder={onOrder} />
    <Features />
    <Categories products={products} categories={categories} onCategory={onCategory} onAll={onViewAllMenu} />
    <PopularDishes dishes={popularDishes} addToCart={addToCart} onViewAll={onViewAllMenu} onViewDetails={onViewDetails} />
    <OffersPreview dishes={offerDishes} addToCart={addToCart} onViewAll={onViewAllOffers} onViewDetails={onViewDetails} />
    <HowItWorks />
    <Reviews reviews={reviews} />
    <Contact reviews={reviews} contactDetails={contactDetails} onAddReview={onAddReview} />
  </main>;
}
