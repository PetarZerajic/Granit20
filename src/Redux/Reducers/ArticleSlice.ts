import { createSlice } from "@reduxjs/toolkit";
import { IArticle } from "../../Models/Article";
import { articles } from "../../Components/Products/ArticleProducts";

export interface IArticlesTypeProps {
  articles: IArticle[];
}

export const initialState: IArticlesTypeProps = {
  articles: articles,
};

export const articlesSlice = createSlice({
  name: "Articles",
  initialState,
  reducers: {
    addArticles: (state, action) => {
      state.articles = action.payload;
    },

    addOneArticle: (state, action) => {
      state.articles = [...state.articles, action.payload];
    },
    updateOneArticle: (state, action) => {
      const art = action.payload;
      const index = state.articles.findIndex((a) => a.id === art.id);
      if (index >= 0 && art) {
        state.articles = [
          ...state.articles.slice(0, index),
          art,
          ...state.articles.slice(index + 1),
        ];
      }
    },
    updateQuantity: (state, action) => {
      const art = action.payload;
      const index = state.articles.findIndex((a) => a.id === art.id);
      if (index >= 0 && art) {
        const updatedQuantity = {
          ...state.articles[index],
          quantity: art.quantity,
        };
        state.articles = [
          ...state.articles.slice(0, index),
          updatedQuantity,
          ...state.articles.slice(index + 1),
        ];
      }
    },

    deleteOneArticle: (state, action) => {
      state.articles = state.articles.filter(
        (article) => article.id !== action.payload.id
      );
    },
  },
});

export const {
  addArticles,
  addOneArticle,
  deleteOneArticle,
  updateOneArticle,
  updateQuantity,
} = articlesSlice.actions;
export default articlesSlice.reducer;
