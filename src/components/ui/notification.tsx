import { cn } from "@/lib/utils";

type NotificationBubbleProps = {
  count?: number;
  className?: string;
  size?: "sm" | "md";
};

export const NotificationBubble = ({
  count,
  className,
  size = "md",
}: NotificationBubbleProps) => {
  if (count === undefined || count <= 0) return null;

  const baseSize = size === "sm" ? "size-4 text-[9px]" : "size-5 text-xs";

  return (
    <span
      className={cn(
        "bg-red-500 text-white rounded-full flex-row-center font-bold flex-none",
        baseSize,
        "absolute -top-2 -right-2",
        className
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};
