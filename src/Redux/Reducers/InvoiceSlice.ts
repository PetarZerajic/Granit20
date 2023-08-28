import { createSlice } from "@reduxjs/toolkit";
import { IInvoice } from "../../Models/Invoice";

export interface IinvoiceTypeProps {
  invoices: IInvoice[];
}

export const initialState: IinvoiceTypeProps = {
  invoices: [],
};

export const InvoiceSlice = createSlice({
  name: "Invoices",
  initialState,
  reducers: {
    addInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    addOneInvoice: (state, action) => {
      state.invoices = [...state.invoices, action.payload];
    },
    updateOneInvoice: (state, action) => {
      const invc = action.payload;
      const index = state.invoices.findIndex((a) => a.id === invc.id);
      if (index >= 0 && invc) {
        state.invoices = [
          ...state.invoices.slice(0, index),
          invc,
          ...state.invoices.slice(index + 1),
        ];
      }
    },
    deleteOneInvoice: (state, action) => {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload.id
      );
    },
  },
});

export const {
  addInvoices,
  addOneInvoice,
  updateOneInvoice,
  deleteOneInvoice,
} = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
