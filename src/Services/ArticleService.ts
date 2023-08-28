import { useDispatch } from "react-redux";
import { IArticle } from "../Models/Article";
import {
  addOneArticle,
  deleteOneArticle,
  updateOneArticle,
} from "../Redux/Reducers/ArticleSlice";

export const ArticleService = () => {
  const dispatch = useDispatch();

  const addNewArticle = async (article: IArticle) => {
    const addArticle = {
      ...article,
      id: Math.floor(Math.random() * 1000) + 1,
      title: article.title,
      price: article.price,
      quantity: article.quantity,
      image: article.image,
      description: article.description,
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
        dispatch(addOneArticle(addArticle));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Greska na serveru" + error);
    }
  };

  const updateArticle = async (article: IArticle) => {
    const updatedArticle = {
      ...article,
      title: article.title,
      price: article.price,
      quantity: article.quantity,
      image: article.image,
      description: article.description,
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
        dispatch(updateOneArticle(updatedArticle));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Greska na serveru" + error);
    }
  };

  const deleteArticle = async (article: IArticle) => {
    const currentArticle = {
      ...article,
      id: article.id,
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
        dispatch(deleteOneArticle(currentArticle));
      }
    } catch (error) {
      console.error("Greska na serveru" + error);
    }
  };

  return { addNewArticle, updateArticle, deleteArticle };
};
