import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export default function BooleanBadge(props: {
  value: boolean;
  trueText?: string;
  falseText?: string;
}) {
  const { t } = useTranslation();

  const getLabel = () => {
    if (props.value) {
      return props.trueText || t("true");
    } else {
      return props.falseText || t("false");
    }
  };

  return (
    <Badge
      className={cn("!bg-neutral-200 text-text-light font-medium", {
        "!bg-green-600": props.value,
        "!bg-red-600 ": !props.value,
      })}
    >
      {getLabel()}
    </Badge>
  );
}
