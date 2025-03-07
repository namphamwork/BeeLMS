import { createApi } from "@reduxjs/toolkit/query/react";
import { setItem } from "../helper/storage";
import { FileUploadResponse } from "../types/Curiculum";
import type { User, UserResponse, UsersResponse } from "../types/User";
import { setUserInfo } from "./authSlice";
import axiosBaseQuery, { BASE_URL } from "./axiosQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserResponse, void>({
      query: () => ({
        url: "/users/info",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.statusCode === 200) {
            dispatch(setUserInfo({ userInfo: data?.data }));
            setItem("userInfo", data?.data);
          }
        } catch (error) {
          // console.log("Lỗi", error);
        }
      },
      providesTags: (id) => [{ type: "User", _id: id }],
    }),
    getUsers: builder.query<UsersResponse, void>({
      query: () => ({ url: "/users", method: "GET" }),
      providesTags: (result) =>
        result ? result?.data.map(({ _id }) => ({ type: "User", _id })) : [],
    }),

    getUser: builder.query<UserResponse, string>({
      query: (id) => ({ url: `/users/${id}`, method: "GET" }),
      providesTags: (id) => [{ type: "User", _id: id }],
    }),
    addUser: builder.mutation<UserResponse, User>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<
      UserResponse,
      { id: string | undefined; body: Omit<User, "_id"> }
    >({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: "PUT",
        data: data.body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<UserResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        // data: id,
      }),
      invalidatesTags: ["User"],
    }),
    uploadAvatar: builder.mutation<FileUploadResponse, FormData>({
      query: (body) => ({
        url: "/files/image",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useGetUserInfoQuery,
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useUploadAvatarMutation,
} = userApi;
