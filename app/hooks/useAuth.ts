import { useRouter } from "next/router";
import { useAuthStore } from "../stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginDto } from "../types/authTypes";
import { authServices } from "../service/authService";

export const useAuth = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: (loginData: LoginDto) => authServices.login(loginData),
    onSuccess: (responseData) => {
      const { data, accessToken } = responseData;
      setAuth(data.user, accessToken);
      router.replace("/dashboard");
    },
  });
  const logoutMutaion = useMutation({
    mutationFn: authServices.logout,
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      router.replace("/login");
    },
  });
  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    logout: logoutMutaion.mutate,
    isLoggingOut: logoutMutaion.isPending,
  };
};
