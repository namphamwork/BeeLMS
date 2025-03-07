import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { lmsApi } from "./service/api";
import { authApi } from "./service/authAPI";
import authSlice from "./service/authSlice";
import { userApi } from "./service/userAPI";
import classSlice from "./service/classSlice";
import { chatApi } from "./service/chatAPI";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    [lmsApi.reducerPath]: lmsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    classroom: classSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      lmsApi.middleware,
      authApi.middleware,
      userApi.middleware,
      chatApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
