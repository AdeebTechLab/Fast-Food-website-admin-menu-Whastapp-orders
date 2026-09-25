import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import orderReducer from "./slices/orderSlice";
import contactReducer from "./slices/contactSlice";

export const store = configureStore({
  reducer: { cart: cartReducer, products: productReducer, categories: categoryReducer, orders: orderReducer, contactDetails: contactReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
