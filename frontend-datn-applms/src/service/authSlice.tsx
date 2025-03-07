import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { removeItem, setItem } from "../helper/storage";
import { User } from "../types/User";
import { RootState } from "../store";
// import type { RootState } from "../store";

export type AuthState = {
  userInfo: User | undefined;
  token: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = {
  userInfo: undefined,
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { token, refreshToken },
      }: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      setItem("access_token", token);
      setItem("refresh_token", refreshToken);
      state.token = token;
      state.refreshToken = refreshToken;
    },
    logOut: (state) => {
      removeItem("access_token");
      removeItem("refresh_token");
      removeItem("userInfo");
      state.token = null;
      state.refreshToken = null;
      state.userInfo = undefined;
      window.location.href = "/login";
    },
    setUserInfo: (
      state,
      { payload: { userInfo } }: PayloadAction<{ userInfo: User }>
    ) => {
      state.userInfo = userInfo;
    },
  },
});

export const { setCredentials, logOut, setUserInfo } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.userInfo;
