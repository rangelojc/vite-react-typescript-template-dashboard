import { DateFormats } from "@/types/app";
import moment from "moment";

interface FormattedDateProps {
  date: string | Date | null | undefined;
  format?: string;
  fallback?: string;
}

export function FormattedDateCell({
  date,
  format = DateFormats.standard12Hour,
  fallback = "",
}: FormattedDateProps) {
  if (!date) return <span>{fallback}</span>;

  return <span>{moment(date).format(format)}</span>;
}
