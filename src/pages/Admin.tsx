import "./Admin.css";
import { AdminPanel } from "../components/admin/AdminPanel";
import type { Category, ContactDetails, Dish, Order, OrderStatus } from "../types";

export function Admin({ products, categories, orders, contactDetails, onClose, onLogout, onAdd, onUpdate, onDelete, onUpdateOrder, onAddCategory, onDeleteCategory, onUpdateContact }: {
  products: Dish[]; categories: Category[]; orders: Order[]; contactDetails: ContactDetails;
  onClose: () => void; onLogout: () => void; onAdd: (dish: Dish) => void; onUpdate: (dish: Dish) => void; onDelete: (id: number) => void;
  onUpdateOrder: (id: string, status: OrderStatus) => void; onAddCategory: (name: string, icon: string) => void; onDeleteCategory: (name: string) => void; onUpdateContact: (details: ContactDetails) => void;
}) {
  return <main className="admin-page"><AdminPanel products={products} categories={categories} orders={orders} contactDetails={contactDetails} onClose={onClose} onLogout={onLogout} onAdd={onAdd} onUpdate={onUpdate} onDelete={onDelete} onUpdateOrder={onUpdateOrder} onAddCategory={onAddCategory} onDeleteCategory={onDeleteCategory} onUpdateContact={onUpdateContact} /></main>;
}
