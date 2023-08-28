import { createSlice } from "@reduxjs/toolkit";
import { IUserInfo } from "../../Models/User";
import { fetchRandomUsers } from "../Actions/FetchRandomUsers/fetchRandomUsers";

interface IUsersTypeProps {
  users: IUserInfo[];
  page: number;
  loading: boolean;
  error: string | undefined;
  fetchIsSuccess: boolean;
}
const initialState: IUsersTypeProps = {
  users: [],
  page: 1,
  loading: false,
  error: "",
  fetchIsSuccess: false,
};

export const userSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter(
        (users) => users.name.first !== action.payload.name.first
      );
    },
    addOneUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    updateOneUser: (state, action) => {
      const usr = action.payload;
      const index = state.users.findIndex(
        (user) => user.id!.value === usr.id.value
      );

      if (index >= 0 && usr) {
        state.users = [
          ...state.users.slice(0, index),
          usr,
          ...state.users.slice(index + 1),
        ];
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchRandomUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRandomUsers.fulfilled, (state, action) => {
      state.loading = false;
      const { results, pageNumber } = action.payload;
      if (state.users.length < 10) {
        state.users = [...state.users, ...results];
        state.page = pageNumber;
        state.fetchIsSuccess = state.users.length === 10;
      }
    });
    builder.addCase(fetchRandomUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const { addOneUser, updateOneUser, deleteUser } = userSlice.actions;
