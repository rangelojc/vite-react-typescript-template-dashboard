import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function StatusBadge(props: { status?: string }) {
  return (
    <Badge
      className={cn("!bg-neutral-200 text-black font-medium", {
        "!bg-green-600 text-text-light": props.status === "paid",
        "!bg-blue-500 text-text-light": props.status === "completed",
        "!bg-red-500 text-text-light": props.status === "failed",
      })}
    >
      {props.status}
    </Badge>
  );
}
