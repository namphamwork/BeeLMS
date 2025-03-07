import { createApi } from "@reduxjs/toolkit/query/react";
import { ChatRoomResponse, ChatRoomsResponse } from "../types/Chat";
import axiosBaseQuery, { BASE_URL } from "./axiosQuery";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllChatRooms: builder.query<ChatRoomsResponse, void>({
      query: () => ({
        url: "/roomchats/mychatroom",
        method: "GET",
      }),
    }),
    getChatRoomById: builder.query<ChatRoomResponse, string>({
      query: (id) => ({
        url: `/roomchats/${id}`,
        method: "GET",
      }),
    }),
    addChatRoom: builder.mutation<
      { statusCode: number; message: string },
      { classroomId: string }
    >({
      query: (body:{classroomId:string}) => {
        console.log({body});
        return {
          url: "/roomchats",
          method: "POST",
          data: body,
        };
      },
    }),
  }),
});

export const {
  useGetAllChatRoomsQuery,
  useGetChatRoomByIdQuery,
  useAddChatRoomMutation,
} = chatApi;
