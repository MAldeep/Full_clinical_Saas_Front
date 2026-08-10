export type LoginDto = {
  email: string;
  password: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: ["Admin", "Staff", "Doctor"];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserAuthStore = {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
};

export type RefreshResponse = {
  user: User;
  accessToken: string;
};

export interface AuthResponse {
  success: boolean;
  accessToken: string;
  data: {
    user: User;
  };
}
