import { useEffect, useRef } from "react";

export const useDidMount = (): boolean => {
  const didMountRef = useRef(false);

  useEffect(() => {
    didMountRef.current = true;
  }, []);

  return didMountRef.current;
};
