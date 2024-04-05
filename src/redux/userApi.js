import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = `${import.meta.env.VITE_BASE_URL}`;
// const URL = "http://localhost:3001/api/v1/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${URL}` }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (formData) => ({
        url: "/login",
        method: "POST",
        body: {
          email: formData.userName,
          password: formData.password,
        },
      }),
    }),
    getProfile: builder.mutation({
      query: (token) => ({
        url: "/profile",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    changeProfile: builder.mutation({
      query: (token, formData) => ({
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
  useLoginMutation,
  useGetProfileMutation,
  useChangeProfileMutation,
} = userApi;
