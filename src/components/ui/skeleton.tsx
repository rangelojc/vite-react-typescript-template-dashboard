import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "h-[20px] min-w-10 bg-neutral-200 dark:bg-neutral-500 animate-pulse rounded-full",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
