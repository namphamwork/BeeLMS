import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";
import { getItem, setItem } from "../helper/storage";

export const BASE_URL = import.meta.env.VITE_API_URL;
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const refreshAccessToken = async () => {
  const refresh_token = getItem("refresh_token");
  if (refresh_token) {
    // console.log({ refresh_token });
    // console.log({ BASE_URL });
    try {
      const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
        refresh_token,
      });
      // console.log(response.data);

      const access_token = response.data.access_token;
      const new_refresh_token = response.data.refresh_token;
      if (access_token && new_refresh_token) {
        setItem("access_token", access_token);
        setItem("refresh_token", new_refresh_token);
        return access_token;
      } else {
        localStorage.clear();
        window.location.href = "/login";
        return null;
      }
    } catch (error) {
      localStorage.clear();
      window.location.href = "/login";
      console.error("Lỗi khi refresh token:", error);
      // throw error;
      return null;
    }
  } else {
    // console.error('Không có refresh token');
    // throw new Error('Không có refresh token');
    return null;
  }
};

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async (
    { url, method, data }: AxiosRequestConfig,
    _api: any,
    _extraOptions: any
  ) => {
    const token = getItem("access_token") as string;

    const config: AxiosRequestConfig = {
      url: `${baseUrl}${url}`,
      method,
      data,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    try {
      const result = await axios.request(config);
      return { data: result.data };
    } catch (error) {
      // console.log({ config });
      const axiosError = error as AxiosError;
      // console.log(axiosError.response);
      if (axiosError.response?.status === 401) {
        const newAccessToken = await refreshAccessToken();
        // console.log({ newAccessToken });
        if (newAccessToken) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };
          try {
            const result = await axios.request(config);
            return { data: result.data };
          } catch (error) {
            const axiosError = error as AxiosError;
            return { error: axiosError.response?.data || "Lỗi không xác định" };
          }
        }
      }
      return { error: axiosError.response?.data || "Lỗi không xác định" };
    }
  };

export default axiosBaseQuery;
