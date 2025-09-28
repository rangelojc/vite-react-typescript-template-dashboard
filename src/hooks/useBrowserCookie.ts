import { useState } from "react";

type TimeUnit = "minutes" | "hours" | "days";

const setCookie = (
  name: string,
  value: string,
  duration: number = 7,
  unit: TimeUnit = "days"
) => {
  const expires = new Date();
  const ms = {
    minutes: duration * 60 * 1000,
    hours: duration * 60 * 60 * 1000,
    days: duration * 24 * 60 * 60 * 1000,
  }[unit];

  expires.setTime(expires.getTime() + ms);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
};

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts && parts.length === 2)
    return parts.pop()?.split(";").shift() ?? null;
  return null;
};

const deleteCookie = (name: string) => {
  setCookie(name, "", -1, "days"); // Expire in the past
};

const useBrowserCookie = (cookieName: string) => {
  const [cookieValue, setCookieState] = useState<string | null>(() =>
    getCookie(cookieName)
  );

  const set = (
    value: string,
    duration: number = 7,
    unit: TimeUnit = "days"
  ) => {
    setCookie(cookieName, value, duration, unit);
    setCookieState(value);
  };

  const get = () => {
    const value = getCookie(cookieName);
    setCookieState(value);
    return value;
  };

  const remove = () => {
    deleteCookie(cookieName);
    setCookieState(null);
  };

  const getHttpHeader = () => {
    const token = get();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  return {
    cookieValue,
    set,
    get,
    remove,
    getHttpHeader,
  };
};

export default useBrowserCookie;
