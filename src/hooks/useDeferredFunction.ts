import { useEffect, useRef } from "react";

export type DeferredFunctionArgs = (f: () => void, duration?: number) => void;

const useDeferredFunction = (defaultDuration = 1000) => {
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (f: () => void, duration?: number) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      f();
    }, duration || defaultDuration);
  };
};

export default useDeferredFunction;
