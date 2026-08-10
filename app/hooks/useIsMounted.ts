import { useEffect, useState } from "react";

export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsMounted(true), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  return isMounted;
};
