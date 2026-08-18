import { User } from "../types/authTypes";
import { Role_Permissions } from "../types/rbac";

export const getUserPermissions = (user: User | null) => {
  if (!user) return [];
  if (user.permissions && user.permissions.length > 0) {
    return user.permissions;
  }
  return Role_Permissions[user.role] ?? [];
};
