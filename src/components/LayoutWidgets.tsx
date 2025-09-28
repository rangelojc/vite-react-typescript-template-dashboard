import { cn, motionEnterFromFadeY } from "@/lib/utils";
import { motion } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";

export const Wrapper = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={cn("w-full h-full px-4 pb-4 ", props.className)}>
      {props.children}
    </div>
  );
};

export const FadeInWrapper = (
  props: { delay?: number } & ComponentPropsWithoutRef<"div">
) => {
  return (
    <motion.div
      {...motionEnterFromFadeY(undefined, { delay: props.delay })}
      className={cn("w-full h-fit p-2 ", props.className)}
    >
      {props.children}
    </motion.div>
  );
};

export const Page = ({
  className,
  style,
  ...rest
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <main
      className={cn(
        "h-screen w-screen overflow-hidden dark:bg-neutral-950 bg-gray-100",
        className
      )}
      style={style}
      {...rest}
    />
  );
};

export const ContentTitle = (props: { text?: string }) => {
  return (
    <h1 className="text-xl font-semibold py-2 h-[var(--header-height)] flex-row-v-center">
      {props.text}
    </h1>
  );
};

export const ContentBox = ({
  className,
  style,
  ...rest
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={cn(
        "mx-auto p-2 shadow border rounded-md w-full overflow-auto h-[calc(100%-var(--header-height))] bg-white dark:bg-neutral-900",
        className
      )}
      style={style}
      {...rest}
    />
  );
};

export const ContentHeader = ({
  className,
  style,
  ...rest
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={cn(
        "w-full flex flex-row items-center gap-x-2 mb-3",
        className
      )}
      style={style}
      {...rest}
    />
  );
};

export const PageHeader = ({
  className,
  style,
  ...rest
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={cn(
        "w-full flex flex-row items-center gap-x-4 mb-3",
        className
      )}
      style={style}
      {...rest}
    />
  );
};
