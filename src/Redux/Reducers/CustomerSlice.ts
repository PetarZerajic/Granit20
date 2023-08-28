import { createSlice } from "@reduxjs/toolkit";
import { ICustomer } from "../../Models/Customers";
import { customers } from "../../Components/Customers/Customers";

export interface customerTypeProps {
  customers: ICustomer[];
}

export const initialState: customerTypeProps = {
  customers: customers,
};

export const CustomerSlice = createSlice({
  name: "Customers",
  initialState,
  reducers: {
    addCustomers: (state, action) => {
      state.customers = action.payload;
    },
    addOneCustomer: (state, action) => {
      state.customers = [...state.customers, action.payload];
    },

    updateOneCustomer: (state, action) => {
      const cust = action.payload;
      const index = state.customers.findIndex((a) => a.id === cust.id);
      if (index >= 0 && cust) {
        state.customers = [
          ...state.customers.slice(0, index),
          cust,
          ...state.customers.slice(index + 1),
        ];
      }
    },
    deleteOneCustomer: (state, action) => {
      state.customers = state.customers.filter(
        (customer) => customer.id !== action.payload.id
      );
    },
  },
});

export const {
  addCustomers,
  addOneCustomer,
  updateOneCustomer,
  deleteOneCustomer,
} = CustomerSlice.actions;

export default CustomerSlice.reducer;
