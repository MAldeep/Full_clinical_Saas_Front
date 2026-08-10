import React from "react";
import GeustRoute from "../components/auth/GeustRoute";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GeustRoute>
      <div>{children}</div>
    </GeustRoute>
  );
}
