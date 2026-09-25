import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Dish } from "../../types";
import { getInitialProducts } from "../../utils/storage";

const normalizeDish = (dish: Dish): Dish => {
  const discount = Math.min(100, Math.max(0, Number(dish.discount) || 0));
  return { ...dish, discount, offer: discount > 0 };
};

const initialState = getInitialProducts().map(normalizeDish);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Dish>) => { state.push(normalizeDish(action.payload)); },
    updateProduct: (state, action: PayloadAction<Dish>) => {
      const index = state.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) state[index] = normalizeDish(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<number>) => state.filter((product) => product.id !== action.payload),
    setProducts: (_, action: PayloadAction<Dish[]>) => action.payload.map(normalizeDish),
  },
});
export const { addProduct, updateProduct, deleteProduct, setProducts } = productSlice.actions;
export default productSlice.reducer;
