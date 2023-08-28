import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../Store/store";

export const fetchRandomUsers = createAsyncThunk(
  "user/fetchRandomUsers",
  async (_, { getState }: any) => {
    const state = getState() as RootState;
    const userInfos = state.users.users;
    const pageNumber = state.users.page;
    try {
      const response = await fetch(
        `https://randomuser.me/api?page=${pageNumber}`
      );
      const data = await response.json();

      if (data >= userInfos.length - 1) {
        return data;
      } else {
        const results = data.results;
        const nextPageNumber = data.info.page + 1;
        return { results: results, pageNumber: nextPageNumber };
      }
    } catch (error) {
      console.error(
        "An error has occurred trying to fetch random users.",
        error
      );
      throw error;
    }
  }
);
