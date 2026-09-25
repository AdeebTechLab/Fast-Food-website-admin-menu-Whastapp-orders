import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ContactDetails } from "../../types";
import { getInitialContactDetails } from "../../utils/storage";

const contactSlice = createSlice({
  name: "contactDetails",
  initialState: getInitialContactDetails(),
  reducers: {
    updateContactDetails: (state, action: PayloadAction<ContactDetails>) => {
      state.whatsapp = action.payload.whatsapp;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
    },
  },
});

export const { updateContactDetails } = contactSlice.actions;
export default contactSlice.reducer;
