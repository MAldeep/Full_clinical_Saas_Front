import { apiClient, publicApiClient } from "../lib/axiosClient";
import { AuthResponse, LoginDto, RefreshResponse } from "../types/authTypes";

export const authServices = {
  login: async (loginData: LoginDto): Promise<AuthResponse> => {
    const response = await publicApiClient.post("auth/login", loginData);
    return response.data;
  },
  logout: async (): Promise<void> => {
    await apiClient.post("auth/logout");
  },
  refreshToken: async (): Promise<RefreshResponse> => {
    const response = await publicApiClient.post("/auth/refresh");
    return response.data;
  },
};
