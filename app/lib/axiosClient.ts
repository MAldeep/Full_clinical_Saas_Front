import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

const BASE_URL: string = "http://localhost:5000/api/";

export const publicApiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (config.headers) {
      const isPublicEndpoint = config.url?.includes("/auth");
      if (token && !isPublicEndpoint) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers["X-App-Version"] = "1.0.0";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isRefreshing: boolean = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;
    if (error.response?.status === 401 && !originalReq._retry) {
      // isRefreshing == true
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalReq.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(originalReq);
          })
          .catch((error) => Promise.reject(error));
      }
      // isRefreshing == false
      originalReq._retry = true;
      isRefreshing = true;
      try {
        const response = await publicApiClient.post("auth/refresh-token");
        const { user, accessToken } = response.data;
        useAuthStore.getState().setAuth(user, accessToken);
        originalReq.headers.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        return apiClient(originalReq);
      } catch (error) {
        processQueue(error, null);
        useAuthStore.getState().clearAuth();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
