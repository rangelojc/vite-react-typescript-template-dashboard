import { ReactNode } from "react";

interface IShow<T> {
  when?: T;
  children: (value: NonNullable<T>) => ReactNode;
  fallback?: ReactNode;
}

export const Show = <T,>({ when, children, fallback }: IShow<T>) => {
  if (!when) return <>{fallback || <></>}</>; // Show fallback if when is falsy
  return children(when);
};
