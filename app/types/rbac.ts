export type Role = "admin" | "staff" | "doctor";

// appointments
export type AppointmentPermissions =
  | "appointment:read"
  | "appointment:add"
  | "appointment:update"
  | "appointment:delete";

export type Permission = AppointmentPermissions;
export const Role_Permissions: Record<Role, AppointmentPermissions[]> = {
  admin: [
    "appointment:read",
    "appointment:add",
    "appointment:update",
    "appointment:delete",
  ],
  staff: ["appointment:read", "appointment:add", "appointment:update"],
  doctor: ["appointment:read"],
};
