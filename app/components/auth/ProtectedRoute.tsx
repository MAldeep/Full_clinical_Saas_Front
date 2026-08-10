"use client";

import { useIsMounted } from "@/app/hooks/useIsMounted";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface ProtectedRouteProps {
  children: React.ReactNode;
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const isMounted = useIsMounted();
  const { user, accessToken } = useAuthStore();
  const isAuthenticated = Boolean(user && accessToken);
  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isMounted, isAuthenticated, router]);
  if (!isMounted || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm font-medium text-slate-600">
            Verifying session...
          </p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
