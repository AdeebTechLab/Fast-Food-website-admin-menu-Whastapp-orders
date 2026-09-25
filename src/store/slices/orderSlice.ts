import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrderStatus } from "../../types";
import { getInitialOrders } from "../../utils/storage";

const orderSlice = createSlice({
  name: "orders",
  initialState: getInitialOrders(),
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => { state.unshift(action.payload); },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: OrderStatus }>) => {
      const order = state.find((item) => item.id === action.payload.id);
      if (order) order.status = action.payload.status;
    },
    removeOrder: (state, action: PayloadAction<string>) => state.filter((order) => order.id !== action.payload),
    setOrders: (_, action: PayloadAction<Order[]>) => action.payload,
  },
});
export const { addOrder, updateOrderStatus, removeOrder, setOrders } = orderSlice.actions;
export default orderSlice.reducer;
