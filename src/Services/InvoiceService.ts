import { useDispatch } from "react-redux";
import {
  addOneInvoice,
  deleteOneInvoice,
  updateOneInvoice,
} from "../Redux/Reducers/InvoiceSlice";
import { IInvoice } from "../Models/Invoice";
import { InvoiceArticle } from "../Models/InvoiceArticle";
import { ICustomer } from "../Models/Customers";
import { updateOneCustomer } from "../Redux/Reducers/CustomerSlice";

export const InvoiceService = () => {
  const dispatch = useDispatch();

  const addNewInvoice = async (
    invoice: IInvoice,
    customer: ICustomer,
    invoiceArticles: InvoiceArticle[],
    CalculateTotalValue: () => number
  ) => {
    const addInvoice = {
      ...invoice,
      id: Math.floor(Math.random() * 1000) + 1,
      articles: invoiceArticles,
      dateExecution: new Date().toLocaleDateString("sr-RS"),
      totalPriceBill: CalculateTotalValue(),
    };

    const updatedCustomer = {
      ...customer,
      invoices: [...(customer.invoices ?? []), addInvoice.id],
    };

    const minDelay = 500;
    const maxDelay = 5000;

    const getRandomDelay = () => {
      return Math.floor(Math.random() * (maxDelay - minDelay) + minDelay);
    };

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      const delayDuration = getRandomDelay();
      await delay(delayDuration);

      const isSuccess = Math.floor(Math.random() * 10) + 1 < 10;

      if (isSuccess) {
        dispatch(addOneInvoice(addInvoice));
        dispatch(updateOneCustomer(updatedCustomer));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Greska na serveru", error);
      return false;
    }
  };

  const updateInvoice = async (
    invoice: IInvoice,
    invoiceArticles: InvoiceArticle[],
    CalculateTotalValue: () => number
  ) => {
    const updatedInvoice = {
      ...invoice,
      articles: invoiceArticles,
      dateExecution: new Date().toLocaleDateString("sr-RS"),
      totalPriceBill: CalculateTotalValue(),
    };

    const minDelay = 500;
    const maxDelay = 5000;

    const getRandomDelay = () => {
      return Math.floor(Math.random() * (maxDelay - minDelay) + minDelay);
    };

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      const delayDuration = getRandomDelay();
      await delay(delayDuration);

      const isSuccess = Math.floor(Math.random() * 10) + 1 < 10;

      if (isSuccess) {
        dispatch(updateOneInvoice(updatedInvoice));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Greska na serveru", error);
      return false;
    }
  };
  const deleteinvoice = async (invoice: IInvoice) => {
    const currentInvoice = {
      ...invoice,
      id: invoice.id,
    };
    const minDelay = 200;
    const maxDelay = 1000;

    const getRandomDelay = () => {
      return Math.floor(Math.random() * (maxDelay - minDelay) + minDelay);
    };

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      const delayDuration = getRandomDelay();
      await delay(delayDuration);

      const isSuccess = Math.floor(Math.random() * 10) + 1 < 10;
      if (isSuccess) {
        dispatch(deleteOneInvoice(currentInvoice));
      }
    } catch (error) {
      console.error("Greska na serveru" + error);
    }
  };

  return {
    addNewInvoice,
    updateInvoice,
    deleteinvoice,
  };
};
