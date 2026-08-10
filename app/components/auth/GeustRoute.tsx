"use client";
import { useIsMounted } from "@/app/hooks/useIsMounted";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface GuestRouteProps {
  children: React.ReactNode;
}
export default function GeustRoute({ children }: GuestRouteProps) {
  const router = useRouter();
  const isMounted = useIsMounted();
  const { user, accessToken } = useAuthStore();
  const isAuthenticated = Boolean(user && accessToken);

  useEffect(() => {
    if (isMounted && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isMounted, isAuthenticated, router]);
  if (!isMounted || isAuthenticated) {
    return null;
  }
  return <>{children}</>;
}
