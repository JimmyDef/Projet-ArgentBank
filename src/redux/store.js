import { configureStore, createSlice } from "@reduxjs/toolkit";
import { userApi } from "./userApi";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    addToken: (state, action) => {
      state = { ...state, token: action.payload };
      return state;
    },
    updateUser: (state, action) => {
      state = {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
      return state;
    },
    clearUserInfos: () => {
      return {};
    },
  },
});

export const store = configureStore({
  reducer: { [userApi.reducerPath]: userApi.reducer, user: userSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export const { updateUser, addToken, clearUserInfos } = userSlice.actions;
