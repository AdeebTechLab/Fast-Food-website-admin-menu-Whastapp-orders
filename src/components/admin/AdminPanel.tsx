import "./AdminPanel.css";
import { useMemo, useState, type FormEvent } from "react";
import { Check, ClipboardList, Mail, Pencil, Phone, Plus, ShieldCheck, Tag, Trash2, Users, X, MessageCircle } from "lucide-react";
import { CategoryIcon } from "../menu/CategoryIcon";
import { formatPrice, getDiscountedPrice } from "../../utils/price";
import type { Category, ContactDetails, Dish, Order, OrderStatus } from "../../types";

type SizeForm = { label: string; price: string };
type ProductForm = { name:string; description:string; price:string; image:string; category:string; ingredients:string; prepTime:string; featured:boolean; inStock:boolean; discount:string; hasSizes:boolean; sizes: SizeForm[] };

type Props = {
  products: Dish[]; categories: Category[]; orders: Order[]; contactDetails: ContactDetails;
  onClose: () => void; onLogout: () => void; onAdd: (d: Dish) => void; onUpdate: (d: Dish) => void; onDelete: (id: number) => void;
  onUpdateOrder: (id: string, status: OrderStatus) => void; onAddCategory: (name: string, icon: string) => void; onDeleteCategory: (name: string) => void; onUpdateContact: (details: ContactDetails) => void;
};

const emptyProduct = (category: string): ProductForm => ({ name:"", description:"", price:"", image:"", category, ingredients:"", prepTime:"", featured:false, inStock:true, discount:"0", hasSizes:false, sizes:[] });

export function AdminPanel({ products, categories, orders, contactDetails, onClose, onLogout, onAdd, onUpdate, onDelete, onUpdateOrder, onAddCategory, onDeleteCategory, onUpdateContact }: Props) {
  const [tab, setTab] = useState<"products"|"orders"|"customers"|"categories"|"contact">("products");
  const [form, setForm] = useState<ProductForm>(() => emptyProduct(categories[0]?.name ?? "Pizza"));
  const [editingId, setEditingId] = useState<number|null>(null);
  const [productErrors, setProductErrors] = useState<Record<string,string>>({});
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("🍽️");
  const [categoryError, setCategoryError] = useState("");
  const [deleteCategoryTarget, setDeleteCategoryTarget] = useState<Category | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [contactForm, setContactForm] = useState<ContactDetails>(contactDetails);
  const [contactErrors, setContactErrors] = useState<Record<string,string>>({});
  const [contactSaved, setContactSaved] = useState(false);

  const update = <K extends keyof ProductForm>(key: K, value: ProductForm[K]) => setForm((current) => ({ ...current, [key]: value }));
  const updateSize = (index: number, key: keyof SizeForm, value: string) => setForm((current) => ({ ...current, sizes: current.sizes.map((size, i) => i === index ? { ...size, [key]: value } : size) }));
  const addSize = () => setForm((current) => ({ ...current, sizes: [...current.sizes, { label: "", price: "" }] }));
  const removeSize = (index: number) => setForm((current) => ({ ...current, sizes: current.sizes.filter((_, i) => i !== index) }));

  const resetForm = () => { setForm(emptyProduct(categories[0]?.name ?? "Pizza")); setImagePreview(""); setEditingId(null); setProductErrors({}); };

  const submitProduct = (e: FormEvent) => {
    e.preventDefault();
    const errors: Record<string,string> = {};
    const name = form.name.trim();
    const description = form.description.trim();
    const ingredients = form.ingredients.trim();
    const prepTime = form.prepTime.trim();
    const basePrice = Number(form.price);
    const discount = Number(form.discount || 0);

    if (!name) errors.name = "Product/Dish name is required.";
    if (!form.category) errors.category = "Category is required.";
    if (!Number.isFinite(basePrice) || basePrice <= 0) errors.price = "Normal/base price is required and must be greater than 0.";
    if (!form.image) errors.image = "Product image is required.";
    if (!description) errors.description = "Description is required.";
    if (!ingredients) errors.ingredients = "Ingredients are required.";
    if (!prepTime) errors.prepTime = "Preparation time is required.";
    if (!Number.isFinite(discount) || discount < 0 || discount > 100) errors.discount = "Discount must be between 0 and 100.";

    const validSizeRows = form.sizes.filter((size) => size.label.trim() || size.price.trim());
    if (form.hasSizes) {
      if (!validSizeRows.length) errors.sizes = "Add at least one size.";
      else {
        form.sizes.forEach((size, index) => {
          if (!size.label.trim()) errors[`size-${index}-label`] = "Size name is required.";
          const price = Number(size.price);
          if (!size.price.trim() || !Number.isFinite(price) || price <= 0) errors[`size-${index}-price`] = "Valid size price is required.";
        });
      }
    }

    setProductErrors(errors);
    if (Object.keys(errors).length) return;

    const sizes = form.hasSizes ? form.sizes.map((size) => ({ label: size.label.trim(), price: Number(size.price) })) : undefined;
    const safeDiscount = Math.min(100, Math.max(0, discount || 0));
    const dish: Dish = {
      id: editingId ?? Date.now(), name, description, price: basePrice, image: form.image, category: form.category,
      ingredients, prepTime, featured: form.featured, offer: safeDiscount > 0, inStock: form.inStock, discount: safeDiscount, ...(sizes ? { sizes } : {})
    };
    editingId === null ? onAdd(dish) : onUpdate(dish);
    resetForm();
  };

  const edit = (dish: Dish) => {
    setEditingId(dish.id);
    setForm({ name:dish.name, description:dish.description, price:String(dish.price), image:dish.image, category:dish.category, ingredients:dish.ingredients, prepTime:dish.prepTime, featured:dish.featured, inStock:dish.inStock, discount:String(dish.discount ?? 0), hasSizes:Boolean(dish.sizes?.length), sizes:dish.sizes?.map((s)=>({label:s.label,price:String(s.price)})) ?? [] });
    setImagePreview(dish.image); setProductErrors({}); setTab("products");
  };

  const handleImage = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { const value = String(reader.result); setForm((current) => ({ ...current, image:value })); setImagePreview(value); setProductErrors((current) => ({ ...current, image:"" })); };
    reader.readAsDataURL(file);
  };

  const submitCategory = (e: FormEvent) => {
    e.preventDefault();
    const name = categoryName.trim();
    if (!name) { setCategoryError("Category name is required."); return; }
    if (categories.some((category) => category.name.toLowerCase() === name.toLowerCase())) { setCategoryError("This category already exists."); return; }
    onAddCategory(name, categoryIcon.trim() || "🍽️"); setCategoryName(""); setCategoryIcon("🍽️"); setCategoryError("");
  };

  const saveContacts = (e: FormEvent) => {
    e.preventDefault();
    const errors: Record<string,string> = {};
    if (!contactForm.whatsapp.trim()) errors.whatsapp = "WhatsApp number is required.";
    if (!contactForm.phone.trim()) errors.phone = "Phone number is required.";
    if (!contactForm.email.trim()) errors.email = "Email address is required.";
    else if (!/^\S+@\S+\.\S+$/.test(contactForm.email.trim())) errors.email = "Please enter a valid email address.";
    setContactErrors(errors);
    if (Object.keys(errors).length) return;
    onUpdateContact({ whatsapp: contactForm.whatsapp.trim(), phone: contactForm.phone.trim(), email: contactForm.email.trim() });
    setContactSaved(true); window.setTimeout(() => setContactSaved(false), 2500);
  };

  return <div className="admin-page-content"><div className="admin-panel">
    <div className="admin-header"><div><p className="script">BiteHub Management</p><h2>Admin Dashboard</h2><span>Products, offers, categories, orders and contact details</span></div><div className="admin-head-actions"><button title="Back to website" onClick={onClose}><X/></button><button className="admin-logout" title="Logout" onClick={onLogout}>Logout</button></div></div>
    <div className="admin-tabs">
      <button className={tab==="products"?"active":""} onClick={()=>setTab("products")}><Tag/> Products</button>
      <button className={tab==="categories"?"active":""} onClick={()=>setTab("categories")}><Plus/> Categories</button>
      <button className={tab==="orders"?"active":""} onClick={()=>setTab("orders")}><ClipboardList/> Orders <b>{orders.length}</b></button>
      <button className={tab==="customers"?"active":""} onClick={()=>setTab("customers")}><Users/> Customers</button>
      <button className={tab==="contact"?"active":""} onClick={()=>{setContactForm(contactDetails);setContactErrors({});setTab("contact")}}><Phone/> Contact Details</button>
    </div>

    {tab==="products" && <div className="admin-layout">
      <form className="admin-form" onSubmit={submitProduct} noValidate>
        <h3>{editingId===null?"Add New Product":"Edit Product"}</h3>
        <label>Product Name<input value={form.name} onChange={e=>update("name",e.target.value)} placeholder="e.g. Beef Burger" />{productErrors.name&&<small className="admin-field-error">{productErrors.name}</small>}</label>
        <label>Category<select value={form.category} onChange={e=>update("category",e.target.value)}><option value="">Select category</option>{categories.map(c=><option key={c.name} value={c.name}>{c.name}</option>)}</select>{productErrors.category&&<small className="admin-field-error">{productErrors.category}</small>}</label>
        <label>Normal / Base Price<input min="0.01" step="0.01" type="number" value={form.price} onChange={e=>update("price",e.target.value)} placeholder="0.00" />{productErrors.price&&<small className="admin-field-error">{productErrors.price}</small>}</label>
        <label className="size-toggle"><input type="checkbox" checked={form.hasSizes} onChange={e=>{update("hasSizes",e.target.checked);setProductErrors((current)=>({...current,sizes:""}))}}/> Does this item have different sizes?</label>
        {form.hasSizes && <div className="size-fields"><div className="size-fields-head"><strong>Size & Price</strong><button type="button" className="add-size-btn" onClick={addSize}><Plus size={14}/> Add Size</button></div>{form.sizes.length===0&&<p className="size-empty">No sizes added yet.</p>}{form.sizes.map((size,index)=><div className="size-field-row" key={index}><div><input value={size.label} onChange={e=>updateSize(index,"label",e.target.value)} placeholder="Size name" />{productErrors[`size-${index}-label`]&&<small className="admin-field-error">{productErrors[`size-${index}-label`]}</small>}</div><div><input min="0.01" step="0.01" type="number" value={size.price} onChange={e=>updateSize(index,"price",e.target.value)} placeholder="Price" />{productErrors[`size-${index}-price`]&&<small className="admin-field-error">{productErrors[`size-${index}-price`]}</small>}</div><button type="button" className="remove-size-btn" onClick={()=>removeSize(index)}><Trash2 size={14}/> Remove</button></div>)}{productErrors.sizes&&<small className="admin-field-error">{productErrors.sizes}</small>}<small className="size-help">Add as many sizes as the product needs. Equal prices are allowed.</small></div>}
        <label>Discount (%)<input min="0" max="100" step="1" type="number" value={form.discount} onChange={e=>update("discount",e.target.value)} placeholder="0" />{productErrors.discount&&<small className="admin-field-error">{productErrors.discount}</small>}</label>
        <div className="price-preview">{Number(form.discount)>0 ? "This product will automatically appear in Hot Offers." : "No discount means this product will not appear in Hot Offers."}</div>
        <label>Product Image<input type="file" accept="image/*" onChange={e=>handleImage(e.target.files?.[0])}/>{imagePreview&&<img className="admin-image-preview" src={imagePreview} alt="Preview"/>}{productErrors.image&&<small className="admin-field-error">{productErrors.image}</small>}</label>
        <label>Description<textarea value={form.description} onChange={e=>update("description",e.target.value)} placeholder="Describe the dish" />{productErrors.description&&<small className="admin-field-error">{productErrors.description}</small>}</label>
        <label>Ingredients<input value={form.ingredients} onChange={e=>update("ingredients",e.target.value)} placeholder="Main ingredients" />{productErrors.ingredients&&<small className="admin-field-error">{productErrors.ingredients}</small>}</label>
        <label>Preparation Time<input value={form.prepTime} onChange={e=>update("prepTime",e.target.value)} placeholder="15-20 min" />{productErrors.prepTime&&<small className="admin-field-error">{productErrors.prepTime}</small>}</label>
        <div className="check-row"><label><input type="checkbox" checked={form.featured} onChange={e=>update("featured",e.target.checked)}/> Popular / Featured</label><label><input type="checkbox" checked={form.inStock} onChange={e=>update("inStock",e.target.checked)}/> In Stock</label></div>
        <button className="checkout" type="submit">{editingId===null?<><Plus size={17}/> Add Product</>:<><Check size={17}/> Save Changes</>}</button>{editingId!==null&&<button type="button" className="cancel-edit" onClick={resetForm}>Cancel Edit</button>}
      </form>
      <div className="admin-products"><div className="admin-products-head"><h3>Menu Products</h3><span>{products.length} products</span></div><div className="admin-list">{products.map(p=><div className="admin-product" key={p.id}><img src={p.image} alt={p.name}/><div className="admin-product-info"><strong>{p.name}</strong><span>{p.category} · {p.sizes?.length?`${p.sizes.length} sizes · `:""}{formatPrice(p.price)} {p.discount>0?`· ${p.discount}% OFF`:""}</span><small>{p.discount>0?"🔥 Hot Offer · ":""}{p.featured?"Popular · ":""}{p.inStock?"Available":"Out of stock"}</small></div><button className="edit-btn" onClick={()=>edit(p)}><Pencil size={16}/></button><button className="delete-btn" onClick={()=>onDelete(p.id)}><Trash2 size={16}/></button></div>)}</div></div>
    </div>}

    {tab==="categories"&&<div className="admin-data category-admin"><div className="data-heading"><div><h3>Manage Categories</h3><p>Add or delete categories. Deleting a category also deletes all food items inside it.</p></div><Tag/></div><form onSubmit={submitCategory} className="category-add-form" noValidate><input value={categoryName} onChange={e=>{setCategoryName(e.target.value);setCategoryError("")}} placeholder="e.g. Sandwiches"/><input className="category-icon-input" value={categoryIcon} onChange={e=>setCategoryIcon(e.target.value)} maxLength={4} aria-label="Category icon" placeholder="🍽️"/><button className="checkout" type="submit"><Plus size={17}/> Add Category</button>{categoryError&&<small className="admin-field-error">{categoryError}</small>}</form><div className="category-admin-list">{categories.map(c=>{const count=products.filter(p=>p.category===c.name).length;return <div key={c.name}><CategoryIcon name={c.name} size={24} icon={c.icon}/><strong>{c.name}</strong><span className="category-item-count">{count} food item{count===1?"":"s"}</span><button className="delete-btn" title={`Delete ${c.name}`} onClick={()=>setDeleteCategoryTarget(c)}><Trash2 size={16}/></button></div>})}</div>
{deleteCategoryTarget&&<div className="modal-overlay" onClick={()=>setDeleteCategoryTarget(null)}><div className="admin-confirm-modal" onClick={e=>e.stopPropagation()}><div className="confirm-icon"><Trash2/></div><h3>Delete {deleteCategoryTarget.name}?</h3><p>This category contains <b>{products.filter(p=>p.category===deleteCategoryTarget.name).length}</b> food item{products.filter(p=>p.category===deleteCategoryTarget.name).length===1?"":"s"}. Deleting this category will also delete all of its food items from the website.</p><div className="confirm-actions"><button type="button" className="cancel-edit" onClick={()=>setDeleteCategoryTarget(null)}>Cancel</button><button type="button" className="delete-confirm-btn" onClick={()=>{onDeleteCategory(deleteCategoryTarget.name);setDeleteCategoryTarget(null)}}><Trash2 size={16}/> Delete</button></div></div></div>}</div>}
{tab==="orders"&&<AdminOrders orders={orders} onUpdateOrder={onUpdateOrder}/>} 
    {tab==="customers"&&<AdminCustomers orders={orders}/>} 
    {tab==="contact"&&<div className="admin-data contact-admin"><div className="data-heading"><div><h3>Contact Details Management</h3><p>Manage WhatsApp, Phone and Email independently.</p></div><MessageCircle/></div><form className="contact-admin-form" onSubmit={saveContacts} noValidate>
      <label><span><MessageCircle size={15}/> WhatsApp Number</span><input value={contactForm.whatsapp} onChange={e=>setContactForm({...contactForm,whatsapp:e.target.value})} placeholder="0313-1111111" />{contactErrors.whatsapp&&<small className="admin-field-error">{contactErrors.whatsapp}</small>}</label>
      <label><span><Phone size={15}/> Phone Number</span><input value={contactForm.phone} onChange={e=>setContactForm({...contactForm,phone:e.target.value})} placeholder="062-1111111" />{contactErrors.phone&&<small className="admin-field-error">{contactErrors.phone}</small>}</label>
      <label><span><Mail size={15}/> Email Address</span><input type="email" value={contactForm.email} onChange={e=>setContactForm({...contactForm,email:e.target.value})} placeholder="info@bitehub.com" />{contactErrors.email&&<small className="admin-field-error">{contactErrors.email}</small>}</label>
      <div className="contact-independent-note">WhatsApp and Phone are independent fields. They may contain the same number, and changing one will never automatically change the other.</div>
      <button className="checkout" type="submit"><Check size={17}/> Save Contact Details</button>{contactSaved&&<div className="contact-saved"><Check size={15}/> Contact details saved successfully.</div>}
    </form></div>}

    <div className="admin-note"><ShieldCheck size={16}/> Admin data is stored in localStorage for this frontend demo. Contact details, products and orders persist after refresh.</div>
  </div></div>;
}

export function AdminOrders({ orders, onUpdateOrder }: { orders:Order[]; onUpdateOrder:(id:string,status:OrderStatus)=>void }) {
  const [filter, setFilter] = useState<"All"|OrderStatus>("All");
  const statuses: OrderStatus[] = ["Pending","Processing","Completed","Delivered","Cancel"];
  const counts = useMemo<Record<"All"|OrderStatus, number>>(() => ({
    All: orders.length,
    Pending: orders.filter(o=>o.status==="Pending").length,
    Processing: orders.filter(o=>o.status==="Processing").length,
    Completed: orders.filter(o=>o.status==="Completed").length,
    Delivered: orders.filter(o=>o.status==="Delivered").length,
    Cancel: orders.filter(o=>o.status==="Cancel").length,
  }), [orders]);
  const filtered = filter==="All" ? orders : orders.filter(o=>o.status===filter);
  const emptyText = filter==="All" ? "No orders yet" : `No ${filter.toLowerCase()} orders`;
  return <div className="admin-data"><div className="data-heading"><div><h3>Manage Orders</h3><p>View all orders and update their current status.</p></div><ClipboardList/></div>
    <div className="order-filter-bar">{(["All",...statuses] as const).map(status=><button key={status} className={filter===status?"active":""} onClick={()=>setFilter(status)}>{status==="Cancel"?"Cancel":status} <b>{counts[status]}</b></button>)}</div>
    {filtered.length===0?<div className="empty-admin"><ClipboardList size={40}/><h3>{emptyText}</h3><p>There are no orders matching this filter.</p></div>:<div className="orders-table">{filtered.map(o=><div className="order-card" key={o.id}><div className="order-top"><strong>{o.id}</strong><span>{o.createdAt}</span><select value={o.status} onChange={e=>onUpdateOrder(o.id,e.target.value as OrderStatus)}>{statuses.map(status=><option key={status} value={status}>{status}</option>)}</select></div><div className="order-body"><div><h4>Customer</h4><p><b>{o.customer.name}</b><br/>{o.customer.phone}<br/>{o.customer.email || "No email"}<br/>{o.customer.address}</p></div><div><h4>Order</h4>{o.items.map(i=><p key={`${i.id}-${i.selectedSize ?? "default"}`}>{i.name}{i.selectedSize ? ` (${i.selectedSize})` : ""} × {i.quantity} — {formatPrice(getDiscountedPrice(i)*i.quantity)}</p>)}<strong>Total: {formatPrice(o.total)}</strong><small>Payment: {o.payment}</small></div></div></div>)}</div>}</div>;
}

export function AdminCustomers({ orders }: { orders:Order[] }) { const customers=orders.reduce<Record<string,Order["customer"]>>((acc,o)=>{acc[o.customer.phone]=o.customer;return acc},{}); return <div className="admin-data"><div className="data-heading"><div><h3>Customer Information</h3><p>Customer information collected from completed checkout orders.</p></div><Users/></div>{Object.values(customers).length===0?<div className="empty-admin"><Users size={40}/><h3>No customers yet</h3></div>:<div className="customers-grid">{Object.values(customers).map(c=><div className="customer-card" key={c.phone}><div className="customer-avatar">{c.name.charAt(0).toUpperCase()}</div><div><h4>{c.name}</h4><p>{c.phone}</p><p>{c.email || "No email"}</p><p>{c.address}</p></div></div>)}</div>}</div>; }
