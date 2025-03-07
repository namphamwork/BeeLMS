import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginResponse } from "../types/LoginResponse";
import type { UserResponse } from "../types/User";
import axiosBaseQuery, { BASE_URL } from "./axiosQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      LoginResponse,
      { username?: string; password?: string }
    >({
      query: (body: { username: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        data: body,
      })
    }),
    registerUser: builder.mutation<
      UserResponse,
      { username: string; password: string; email: string }
    >({
      query: (body: { username: string; password: string; email: string }) => ({
        url: "/auth/register",
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
