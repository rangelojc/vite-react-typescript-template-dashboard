import { DateFormats } from "@/types/app";
import { clsx, type ClassValue } from "clsx";
import { Transition } from "framer-motion";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollTargetToChild = (
  target: string,
  child: string,
  smooth?: boolean,
  offsetTop: number = 0
) => {
  const targetEl = document.querySelector(target) as HTMLElement;
  const childEl = document.querySelector(child) as HTMLElement;

  if (targetEl && childEl) {
    targetEl.scroll({
      top: childEl.offsetTop + offsetTop,
      behavior: smooth ? "smooth" : "instant",
    });
  }
};

export const motionEnterFromFadeY = (
  offset?: number,
  transitionOptions?: Transition
) => {
  return {
    viewport: { once: true },
    initial: { opacity: 0, y: offset || 20 },
    animate: { opacity: 1, y: 0 },
    transition: { ...{ duration: 0.5 }, ...transitionOptions },
  };
};

export const motionScaleYProps = (scale?: number) => {
  return {
    initial: { opacity: 0, scaleY: scale || 0 },
    animate: { opacity: 1, scaleY: 1 },
    exit: { opacity: 0, scaleY: scale || 0 },
  };
};

export const motionScaleProps = (scale?: number) => {
  return {
    initial: { opacity: 0, scale: scale || 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: scale || 0 },
  };
};

export const motionFadeProps = () => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
};

export const motionFadeYProps = (offset?: number) => {
  return {
    initial: { opacity: 0, y: offset || -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: offset || -10 },
  };
};

export const motionFadeXProps = (offset?: number) => {
  return {
    initial: { opacity: 0, x: offset || -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: offset || -20 },
  };
};

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRandomCandlestickData = (numCandles = 20) => {
  let data = [];
  let currentTime = 1612444800000; // Starting point for time (timestamp in ms)

  for (let i = 0; i < numCandles; i++) {
    const open = getRandomInt(95, 115);
    const high = getRandomInt(open, open + 10); // High is always greater than or equal to open
    const low = getRandomInt(open - 10, open); // Low is always less than or equal to open
    const close = getRandomInt(low, high);

    data.push({
      time: currentTime,
      open,
      high,
      low,
      close,
    });

    currentTime += 86400000; // Increment by 1 day (86400000 ms)
  }

  return data;
};

export const formatDate = (date: string) => {
  return moment(date).format(DateFormats.standard12Hour);
};

export const formatNumber = (num: number) => num.toLocaleString("ko-KR");

export const getRelativeTime = (date: string) => {
  const now = moment();
  const mDate = moment(date);
  const diffMinutes = now.diff(mDate, "minutes");
  const diffSeconds = now.diff(mDate, "seconds");
  const diffHours = now.diff(mDate, "hours");
  const diffDays = now.diff(mDate, "days");

  if (diffSeconds < 60) {
    return "a few seconds ago";
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays <= 7) {
    return `${diffDays}d ago`;
  } else {
    return formatDate(date);
  }
};
