import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "http://localhost:3001/api/v1/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),

  endpoints: (builder) => ({
    //
    // Construction du endpoint pour récupérer le jeton d'authentification.

    signIn: builder.mutation({
      query: (formData) => ({
        url: "/login",
        method: "POST",
        body: {
          email: formData.userName,
          password: formData.password,
        },
      }),
    }),

    // Construction du endpoint pour récupérer les infos profile utilisateur.

    getProfile: builder.mutation({
      query: (token) => ({
        url: "/profile",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    // Construction du endpoint pour mettre à jour les infos profile utilisateur.

    updateProfile: builder.mutation({
      query: ({ token, formData }) => ({
        url: "/profile",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useGetProfileMutation,
  useUpdateProfileMutation,
} = userApi;
