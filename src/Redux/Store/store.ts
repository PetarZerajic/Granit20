import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "../Reducers/ArticleSlice";
import invoicesReducer from "../Reducers/InvoiceSlice";
import customersRecuer from "../Reducers/CustomerSlice";
import userReducer from "../Reducers/UsersSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    invoices: invoicesReducer,
    customers: customersRecuer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
