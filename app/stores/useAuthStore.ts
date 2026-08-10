import { create } from "zustand";
import { User, UserAuthStore } from "../types/authTypes";

export const useAuthStore = create<UserAuthStore>()((set) => ({
  user: null,
  accessToken: null,
  setAuth: (user: User, accessToken: string) =>
    set({
      user,
      accessToken,
    }),
  clearAuth: () => set({ user: null, accessToken: null }),
}));
