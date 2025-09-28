import { useEffect, useRef } from "react";

export type DeferredFunctionArgs = (f: () => void, duration?: number) => void;

const useDelay = (defaultDuration = 1000) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (f: () => void, duration?: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      f();
    }, duration || defaultDuration);
  };
};

export default useDelay;
