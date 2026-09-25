import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../../types";
import { getInitialCategories } from "../../utils/storage";

const canonicalName = (value: string) => {
  const name = value.trim();
  const lower = name.toLowerCase();
  if (["sandwich", "sandwiches", "sadwiches"].includes(lower)) return "Sandwiches";
  if (["drink", "drinks", "beverage", "beverages"].includes(lower)) return "Beverages";
  return name;
};

const categorySlice = createSlice({
  name: "categories",
  initialState: getInitialCategories(),
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      const name = canonicalName(action.payload.name);
      if (!name || state.some((category) => canonicalName(category.name).toLowerCase() === name.toLowerCase())) return;
      state.push({ ...action.payload, name });
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.findIndex((category) => category.name === action.payload.name);
      if (index !== -1) state[index] = action.payload;
    },
    deleteCategory: (state, action: PayloadAction<string>) => state.filter((category) => category.name !== action.payload),
    setCategories: (_, action: PayloadAction<Category[]>) => action.payload,
  },
});
export const { addCategory, updateCategory, deleteCategory, setCategories } = categorySlice.actions;
export default categorySlice.reducer;
