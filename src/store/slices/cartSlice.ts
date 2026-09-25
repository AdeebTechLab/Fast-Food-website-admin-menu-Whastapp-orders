import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Dish } from "../../types";
import { cartKey, getDishSizePrice } from "../../utils/price";

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    addToCart: (state, action: PayloadAction<{ dish: Dish; selectedSize?: string }>) => {
      const { dish, selectedSize } = action.payload;
      const key = `${dish.id}-${selectedSize ?? "default"}`;
      const existing = state.find((item) => cartKey(item) === key);
      if (existing) existing.quantity += 1;
      else state.push({ ...dish, quantity: 1, selectedSize, unitPrice: getDishSizePrice(dish, selectedSize) });
    },
    updateQuantity: (state, action: PayloadAction<{ key: string; amount: number }>) => {
      const item = state.find((entry) => cartKey(entry) === action.payload.key);
      if (item) item.quantity += action.payload.amount;
      return state.filter((entry) => entry.quantity > 0);
    },
    removeFromCart: (state, action: PayloadAction<string>) => state.filter((item) => cartKey(item) !== action.payload),
    clearCart: () => [],
  },
});
export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
