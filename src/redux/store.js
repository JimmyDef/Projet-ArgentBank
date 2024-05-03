import { configureStore, createSlice } from "@reduxjs/toolkit";
import { userApi } from "./userApi";

// --------------------------
// Définition des actions pour gérer l'état du store redux.
// --------------------------

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

// --------------------------
// Configuration du store et ajout du middleWare pour la gestion des call API de RTK Query.
// --------------------------

export const store = configureStore({
  reducer: { [userApi.reducerPath]: userApi.reducer, user: userSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export const { updateUser, addToken, clearUserInfos } = userSlice.actions;
