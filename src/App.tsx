import { useEffect, useMemo, useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { TopBar } from "./components/layout/TopBar";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { CartDrawer } from "./components/cart/CartDrawer";
import { CheckoutModal } from "./components/cart/CheckoutModal";
import { DishDetailsModal } from "./components/menu/DishDetailsModal";
import { AdminLogin } from "./components/admin/AdminLogin";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Offers } from "./pages/Offers";
import { Admin } from "./pages/Admin";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateQuantity,
} from "./store/slices/cartSlice";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "./store/slices/productSlice";
import { addCategory, deleteCategory } from "./store/slices/categorySlice";
import { addOrder, updateOrderStatus } from "./store/slices/orderSlice";
import { updateContactDetails } from "./store/slices/contactSlice";
import { getCartTotal, cartKey } from "./utils/price";
import {
  CATEGORIES_KEY,
  CONTACT_DETAILS_KEY,
  ORDERS_KEY,
  PRODUCTS_KEY,
  REVIEWS_KEY,
  persist,
  getInitialReviews,
} from "./utils/storage";
import type { Dish, Order, Page, Review, OrderStatus } from "./types";

type Route = Page | "admin" | "admin-login";

const getRoute = (): Route => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/admin") return "admin";
  if (path === "/admin/login") return "admin-login";
  if (path === "/menu") return "menu";
  if (path === "/offers") return "offers";
  return "home";
};

function App() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const categories = useAppSelector((state) => state.categories);
  const cart = useAppSelector((state) => state.cart);
  const orders = useAppSelector((state) => state.orders);
  const contactDetails = useAppSelector((state) => state.contactDetails);

  const [route, setRoute] = useState<Route>(getRoute);
  const [reviews, setReviews] = useState<Review[]>(getInitialReviews);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(
    () => sessionStorage.getItem("bitehub_admin") === "true",
  );
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => persist(PRODUCTS_KEY, products), [products]);
  useEffect(() => persist(CATEGORIES_KEY, categories), [categories]);
  useEffect(() => persist(ORDERS_KEY, orders), [orders]);
  useEffect(() => persist(REVIEWS_KEY, reviews), [reviews]);
  useEffect(
    () => persist(CONTACT_DETAILS_KEY, contactDetails),
    [contactDetails],
  );

  useEffect(() => {
    const handlePopState = () => setRoute(getRoute());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    document.body.classList.toggle(
      "admin-route-active",
      route === "admin" || route === "admin-login",
    );
    return () => document.body.classList.remove("admin-route-active");
  }, [route]);

  useEffect(() => {
    if (route === "admin-login" && adminAuthenticated) navigate("/admin");
    if (route === "admin" && !adminAuthenticated) navigate("/admin/login");
  }, [route, adminAuthenticated]);

  const navigate = (path: string) => {
    if (window.location.pathname !== path)
      window.history.pushState({}, "", path);
    setRoute(getRoute());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const hasDiscount = (dish: Dish) =>
    Number.isFinite(Number(dish.discount)) && Number(dish.discount) > 0;
  const popularDishes = useMemo(
    () => products.filter((dish) => dish.inStock && dish.featured).slice(0, 5),
    [products],
  );
  const offerDishes = useMemo(
    () => products.filter((dish) => dish.inStock && hasDiscount(dish)),
    [products],
  );
  const normalizedSearch = search.trim().toLowerCase();
  const matchesSearch = (dish: Dish) => {
    if (!normalizedSearch) return true;
    return `${dish.name} ${dish.description} ${dish.category} ${dish.ingredients}`
      .toLowerCase()
      .includes(normalizedSearch);
  };
  const menuDishes = useMemo(
    () =>
      products.filter((dish) => {
        const categoryMatch =
          activeCategory === "All" ||
          (activeCategory === "Hot Offers"
            ? hasDiscount(dish)
            : dish.category === activeCategory);
        return categoryMatch && matchesSearch(dish) && dish.inStock;
      }),
    [products, activeCategory, normalizedSearch],
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = getCartTotal(cart);

  const goHome = () => {
    navigate("/");
    setActiveCategory("All");
    setMobileMenu(false);
  };

  const openMenu = (category = "All") => {
    navigate("/menu");
    setActiveCategory(category);
    setMobileMenu(false);
  };

  const openOffers = () => {
    navigate("/offers");
    setActiveCategory("All");
    setMobileMenu(false);
  };

  const openAdminLogin = () => {
    setMobileMenu(false);
    navigate("/admin/login");
  };

  const scrollTo = (id: string) => {
    navigate("/");
    setMobileMenu(false);
    window.setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      80,
    );
  };

  const handleAddToCart = (dish: Dish, selectedSize?: string) => {
    dispatch(addToCart({ dish, selectedSize }));
    showToast(
      `${dish.name}${selectedSize ? ` (${selectedSize})` : ""} added to cart`,
    );
  };

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
    cart
      .filter((item) => item.id === id)
      .forEach((item) => dispatch(removeFromCart(cartKey(item))));
    showToast("Product deleted");
  };

  const handleDeleteCategory = (categoryName: string) => {
    dispatch(deleteCategory(categoryName));
    products
      .filter((dish) => dish.category === categoryName)
      .forEach((dish) => {
        dispatch(deleteProduct(dish.id));
        cart
          .filter((item) => item.id === dish.id)
          .forEach((item) => dispatch(removeFromCart(cartKey(item))));
      });
    if (activeCategory === categoryName) setActiveCategory("All");
    showToast(`${categoryName} category and its food items were deleted`);
  };

  const handleAddCategory = (name: string, icon: string) => {
    const normalized = name.trim().toLowerCase();
    const duplicate = categories.some(
      (category) => category.name.trim().toLowerCase() === normalized,
    );
    if (duplicate) {
      showToast("This category already exists");
      return;
    }
    dispatch(addCategory({ name: name.trim(), icon }));
    showToast(`${name.trim()} category added`);
  };

  const placeOrder = (customer: Order["customer"], payment: string) => {
    dispatch(
      addOrder({
        id: `BH-${Date.now().toString().slice(-6)}`,
        customer,
        items: cart,
        total: cartTotal,
        payment,
        status: "Pending",
        createdAt: new Date().toLocaleString(),
      }),
    );
  };

  const handleAdminSuccess = () => {
    sessionStorage.setItem("bitehub_admin", "true");
    setAdminAuthenticated(true);
    navigate("/admin");
  };

  const logoutAdmin = () => {
    sessionStorage.removeItem("bitehub_admin");
    setAdminAuthenticated(false);
    navigate("/");
    showToast("Logged out of Admin Panel");
  };

  if (route === "admin-login") {
    return (
      <div className="admin-login-page">
        <AdminLogin onClose={goHome} onSuccess={handleAdminSuccess} />
      </div>
    );
  }

  if (route === "admin") {
    if (!adminAuthenticated) return null;
    return (
      <div className="app admin-page-shell">
        <Admin
          products={products}
          categories={categories}
          orders={orders}
          contactDetails={contactDetails}
          onClose={goHome}
          onLogout={logoutAdmin}
          onAdd={(product) => dispatch(addProduct(product))}
          onUpdate={(product) => dispatch(updateProduct(product))}
          onDelete={handleDeleteProduct}
          onUpdateOrder={(id, status) =>
            dispatch(updateOrderStatus({ id, status: status as OrderStatus }))
          }
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          onUpdateContact={(details) => dispatch(updateContactDetails(details))}
        />
        {toast && (
          <div className="toast-message">
            <Check size={17} /> {toast}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <TopBar />
      <Header
        page={route}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        onCart={() => setShowCart(true)}
        goHome={goHome}
        openMenu={openMenu}
        openOffers={openOffers}
        scrollTo={scrollTo}
        search={search}
        setSearch={setSearch}
      />

      {route === "home" && (
        <Home
          products={products}
          categories={categories}
          popularDishes={popularDishes}
          offerDishes={offerDishes}
          reviews={reviews}
          contactDetails={contactDetails}
          onOrder={() => openMenu()}
          onCategory={openMenu}
          onViewDetails={setSelectedDish}
          onAddReview={(review) =>
            setReviews((current) => [review, ...current])
          }
          onViewAllMenu={() => openMenu()}
          onViewAllOffers={openOffers}
          addToCart={handleAddToCart}
        />
      )}
      {route === "menu" && (
        <Menu
          categories={categories}
          dishes={menuDishes}
          activeCategory={activeCategory}
          setCategory={setActiveCategory}
          addToCart={handleAddToCart}
          onAll={() => setActiveCategory("All")}
          onViewDetails={setSelectedDish}
        />
      )}
      {route === "offers" && (
        <Offers
          categories={categories}
          dishes={offerDishes.filter(matchesSearch)}
          addToCart={handleAddToCart}
          onViewDetails={setSelectedDish}
        />
      )}

      <Footer
        categories={categories}
        contactDetails={contactDetails}
        goHome={goHome}
        openMenu={openMenu}
        openOffers={openOffers}
        scrollTo={scrollTo}
        onAdmin={openAdminLogin}
      />

      <button
        className="floating-cart"
        onClick={() => setShowCart(true)}
        aria-label="Open cart"
      >
        <ShoppingCart size={21} />
        {cartCount > 0 && <b>{cartCount}</b>}
      </button>

      {toast && (
        <div className="toast-message">
          <Check size={17} /> {toast}
        </div>
      )}
      {selectedDish && (
        <DishDetailsModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          addToCart={(dish, size) => {
            handleAddToCart(dish, size);
            setSelectedDish(null);
          }}
        />
      )}
      {showCart && (
        <CartDrawer
          cart={cart}
          total={cartTotal}
          onClose={() => setShowCart(false)}
          onAdd={handleAddToCart}
          onUpdate={(key, amount) => dispatch(updateQuantity({ key, amount }))}
          onRemove={(key) => dispatch(removeFromCart(key))}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
        />
      )}
      {showCheckout && (
        <CheckoutModal
          cart={cart}
          total={cartTotal}
          whatsappNumber={contactDetails.whatsapp}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            dispatch(clearCart());
            setShowCheckout(false);
            showToast("Order placed successfully");
          }}
          placeOrder={placeOrder}
        />
      )}
    </div>
  );
}

export default App;
