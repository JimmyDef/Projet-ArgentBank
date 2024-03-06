import { configureStore, createSlice } from "@reduxjs/toolkit";

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
  reducer: { user: userSlice.reducer },
});

export const { updateUser, addToken, clearUserInfos } = userSlice.actions;
