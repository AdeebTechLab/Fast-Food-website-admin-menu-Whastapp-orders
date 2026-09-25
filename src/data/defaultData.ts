import type { Category, Dish, FoodSize } from "../types";

export type { Category, Dish, FoodSize };

export const categories: Category[] = [
  { name: "Pizza", icon: "🍕" },
  { name: "Burgers", icon: "🍔" },
  { name: "Pasta", icon: "🍝" },
  { name: "Chicken", icon: "🍗" },
  { name: "Desserts", icon: "🍰" },
  { name: "Beverages", icon: "🥤" },
  { name: "Fries", icon: "🍟" },
  { name: "Sandwiches", icon: "🥪" }
];

const pics = {
  pizza: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
  pizza2: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
  burger2: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85",
  pasta: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
  pasta2: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=85",
  chicken: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85",
  chicken2: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=85",
  dessert: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85",
  dessert2: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85",
  drink: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85",
  drink2: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85",
  fries: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",
  sandwich: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85"
};

const sizes = (small: number, medium: number, large: number): FoodSize[] => [
  { label: "Small", price: small }, { label: "Medium", price: medium }, { label: "Large", price: large }
];

const item = (
  id: number, name: string, category: string, price: number, image: string,
  description: string, ingredients: string, offer = false, featured = false,
  discount = 0, foodSizes?: FoodSize[]
): Dish => ({
  id, name, category, price, image, description, ingredients,
  prepTime: "15-25 min", featured, offer, inStock: true,
  discount: discount || (offer ? 15 : 0), sizes: foodSizes
});

export const dishes: Dish[] = [
  // Pizza
  item(1, "Chicken Margherita Pizza", "Pizza", 12.99, pics.pizza, "Classic pizza with chicken, mozzarella and fresh basil.", "Chicken, mozzarella, tomato, basil", false, true, 0, sizes(9.99, 12.99, 16.99)),
  item(2, "Pepperoni Feast", "Pizza", 13.99, pics.pizza2, "Crispy crust loaded with pepperoni and melted cheese.", "Pepperoni, mozzarella, tomato sauce", true, false, 15, sizes(10.99, 13.99, 17.99)),
  item(3, "Creamy Chicken Pizza", "Pizza", 14.49, pics.pizza, "Creamy chicken pizza with herbs and roasted vegetables.", "Chicken, cream, herbs, vegetables", true, false, 15, sizes(11.49, 14.49, 18.49)),
  item(4, "Veggie Supreme Pizza", "Pizza", 11.99, pics.pizza2, "Colorful vegetables, cheese and a rich tomato base.", "Capsicum, onion, olives, tomato, cheese", false, true, 0, sizes(8.99, 11.99, 15.99)),
  item(5, "BBQ Beef Pizza", "Pizza", 15.49, pics.pizza, "Smoky BBQ beef with onion and extra cheese.", "Beef, BBQ sauce, onion, cheese", true, false, 15, sizes(12.49, 15.49, 19.49)),

  // Burgers
  item(6, "Grilled Chicken Burger", "Burgers", 8.99, pics.burger, "Juicy grilled chicken with fresh vegetables.", "Chicken, lettuce, tomato, cheese, sauce", false, true),
  item(7, "Classic Beef Burger", "Burgers", 9.49, pics.burger2, "Classic beef patty with cheese and house sauce.", "Beef, cheese, lettuce, tomato, sauce", false, true),
  item(8, "Double Cheese Burger", "Burgers", 11.99, pics.burger, "Two juicy patties with double melted cheese.", "Beef, double cheese, onion, sauce", true, false, 15),
  item(9, "Crispy Chicken Burger", "Burgers", 9.99, pics.burger2, "Crispy chicken fillet with creamy signature sauce.", "Chicken, lettuce, cheese, signature sauce", false, true),
  item(10, "Spicy Jalapeno Burger", "Burgers", 10.49, pics.burger, "Spicy burger with jalapeno, cheese and crunchy onions.", "Beef, jalapeno, cheese, onion", true, false, 15),

  // Pasta
  item(11, "Creamy Alfredo Pasta", "Pasta", 11.99, pics.pasta, "Rich creamy pasta with herbs and chicken.", "Pasta, chicken, cream, parmesan, herbs", false, true),
  item(12, "Chicken Pesto Pasta", "Pasta", 12.99, pics.pasta2, "Fresh basil pesto with chicken and parmesan.", "Pasta, chicken, pesto, parmesan", false, true),
  item(13, "Arrabbiata Pasta", "Pasta", 9.99, pics.pasta, "Classic tomato pasta with garlic and chili.", "Pasta, tomato, garlic, chili", true, false, 15),
  item(14, "Creamy Mushroom Pasta", "Pasta", 10.99, pics.pasta2, "Creamy mushroom pasta finished with herbs.", "Pasta, mushroom, cream, herbs", true, false, 15),
  item(15, "Spicy Chicken Penne", "Pasta", 12.49, pics.pasta, "Penne pasta with spicy chicken and tomato sauce.", "Penne, chicken, tomato, chili", false, true),

  // Chicken
  item(16, "Grilled Chicken Platter", "Chicken", 13.99, pics.chicken, "Juicy grilled chicken served with fresh sides.", "Chicken, herbs, salad, sauce", false, true),
  item(17, "Crispy Chicken Strips", "Chicken", 9.99, pics.chicken2, "Golden crispy chicken strips with signature dip.", "Chicken, breadcrumbs, herbs, dip", true, false, 15),
  item(18, "Chicken Wings", "Chicken", 10.99, pics.chicken, "Tender wings tossed in a flavorful house sauce.", "Chicken wings, sauce, herbs", false, true),
  item(19, "BBQ Chicken Quarter", "Chicken", 12.49, pics.chicken2, "Smoky BBQ chicken with roasted seasoning.", "Chicken, BBQ sauce, spices", true, false, 15),
  item(20, "Spicy Fried Chicken", "Chicken", 11.49, pics.chicken, "Crispy fried chicken with a spicy crunchy coating.", "Chicken, spices, flour, herbs", false, true),

  // Desserts
  item(21, "Chocolate Lava Cake", "Desserts", 6.99, pics.dessert, "Warm chocolate cake with vanilla ice cream.", "Chocolate, flour, eggs, butter, vanilla", true, false, 15),
  item(22, "Strawberry Cheesecake", "Desserts", 7.49, pics.dessert2, "Creamy cheesecake topped with fresh strawberries.", "Cream cheese, strawberry, biscuit base", false, true),
  item(23, "Tiramisu Cup", "Desserts", 6.49, pics.dessert, "Coffee soaked layers with a creamy mascarpone topping.", "Coffee, mascarpone, cocoa, biscuits", false, true),
  item(24, "Chocolate Brownie", "Desserts", 5.99, pics.dessert2, "Rich fudgy brownie with chocolate chunks.", "Chocolate, flour, butter, cocoa", true, false, 15),
  item(25, "Caramel Waffle", "Desserts", 6.99, pics.dessert, "Warm waffle with caramel and a scoop of ice cream.", "Waffle, caramel, ice cream", false, true),

  // Beverages
  item(26, "Fresh Lemonade", "Beverages", 3.49, pics.drink, "Fresh lemon drink served chilled.", "Lemon, water, sugar, mint", true, false, 15, sizes(2.49, 3.49, 4.49)),
  item(27, "Mango Smoothie", "Beverages", 4.99, pics.drink2, "Thick creamy mango smoothie made fresh.", "Mango, milk, ice", false, true, 0, sizes(3.99, 4.99, 5.99)),
  item(28, "Strawberry Shake", "Beverages", 4.49, pics.drink, "Cold strawberry shake with a creamy finish.", "Strawberry, milk, cream", true, false, 15, sizes(3.49, 4.49, 5.49)),
  item(29, "Mint Mojito", "Beverages", 3.99, pics.drink2, "Refreshing mint and lime cooler.", "Mint, lime, soda, sugar", false, true),
  item(30, "Iced Coffee", "Beverages", 4.49, pics.drink, "Smooth iced coffee with milk and light sweetness.", "Coffee, milk, ice", true, false, 15),

  // Fries
  item(31, "Classic Salted Fries", "Fries", 4.49, pics.fries, "Golden crispy fries with a light seasoning.", "Potatoes, salt, oil", false, true, 0, sizes(3.49, 4.49, 5.99)),
  item(32, "Cheesy Loaded Fries", "Fries", 6.49, pics.fries, "Crispy fries topped with melted cheese and sauce.", "Potatoes, cheese, sauce", true, false, 15, sizes(5.49, 6.49, 8.49)),
  item(33, "Masala Fries", "Fries", 4.99, pics.fries, "Crispy fries tossed in our spicy masala.", "Potatoes, masala, herbs", false, true),
  item(34, "Peri Peri Fries", "Fries", 5.49, pics.fries, "Crispy fries with a bold peri peri seasoning.", "Potatoes, peri peri spice", true, false, 15),
  item(35, "Garlic Parmesan Fries", "Fries", 6.99, pics.fries, "Fries finished with garlic, parmesan and herbs.", "Potatoes, garlic, parmesan, herbs", false, true),

  // Sandwiches
  item(36, "Grilled Chicken Sandwich", "Sandwiches", 8.49, pics.sandwich, "Tender grilled chicken with lettuce and creamy sauce.", "Chicken, lettuce, tomato, sauce", false, true),
  item(37, "Club Sandwich", "Sandwiches", 9.99, pics.sandwich, "Triple-layer sandwich packed with chicken, egg and fresh salad.", "Chicken, egg, lettuce, tomato, bread", true, false, 15),
  item(38, "Crispy Chicken Sandwich", "Sandwiches", 8.99, pics.sandwich, "Crunchy chicken fillet with cheese and signature sauce.", "Chicken, cheese, lettuce, sauce", false, true),
  item(39, "Tuna Melt Sandwich", "Sandwiches", 8.49, pics.sandwich, "Creamy tuna filling with melted cheese.", "Tuna, cheese, mayo, bread", true, false, 15),
  item(40, "Veggie Grilled Sandwich", "Sandwiches", 6.99, pics.sandwich, "Grilled vegetables, cheese and house spread.", "Capsicum, tomato, onion, cheese", false, true),

  // Extra choices to keep every category rich
  item(41, "BBQ Chicken Sandwich", "Sandwiches", 9.49, pics.sandwich, "Smoky BBQ chicken with crunchy vegetables.", "Chicken, BBQ sauce, lettuce, onion", false, false),
  item(42, "Cheese Fries Supreme", "Fries", 7.49, pics.fries, "Loaded fries with cheese, jalapenos and special sauce.", "Potatoes, cheese, jalapeno, sauce", true, false, 15),
  item(43, "Peach Iced Tea", "Beverages", 3.99, pics.drink2, "Chilled peach iced tea with a refreshing finish.", "Tea, peach, lemon, ice", false, false),
  item(44, "Four Cheese Pizza", "Pizza", 15.99, pics.pizza2, "Rich four-cheese pizza with a golden crust.", "Mozzarella, cheddar, parmesan, cream cheese", true, false, 15, sizes(12.99, 15.99, 19.99)),
  item(45, "Chocolate Fudge Sundae", "Desserts", 7.99, pics.dessert2, "Chocolate ice cream topped with fudge and brownie pieces.", "Ice cream, chocolate, fudge, brownie", true, false, 15)
];
