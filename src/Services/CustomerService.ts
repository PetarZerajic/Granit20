import { useDispatch } from "react-redux";
import { ICustomer } from "../Models/Customers";
import {
  addOneCustomer,
  updateOneCustomer,
  deleteOneCustomer,
} from "../Redux/Reducers/CustomerSlice";

export const CustomerService = () => {
  const dispatch = useDispatch();
  const addNewCustomer = async (customer: ICustomer) => {
    const addCustomer = {
      ...customer,
      id: Math.floor(Math.random() * 1000) + 1,
      name: customer.name,
      lastName: customer.lastName,
      adress: customer.address,
      presonalNumber: customer.presonalNumber,
      uniqueCitizens: customer.uniqueCitizens,
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
        dispatch(addOneCustomer(addCustomer));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Greska na serveru" + error);
    }
  };
  const updateCustomer = async (customer: ICustomer) => {
    const updatedCustomer = {
      ...customer,
      name: customer.name,
      lastName: customer.lastName,
      adress: customer.address,
      presonalNumber: customer.presonalNumber,
      uniqueCitizens: customer.uniqueCitizens,
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
        dispatch(updateOneCustomer(updatedCustomer));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Greska na serveru" + error);
    }
  };
  const deleteCustomer = async (customer: ICustomer) => {
    const currentCustomer = {
      ...customer,
      id: customer.id,
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
        dispatch(deleteOneCustomer(currentCustomer));
      }
    } catch (error) {
      console.error("Greska na serveru" + error);
    }
  };
  return { addNewCustomer, updateCustomer, deleteCustomer };
};
