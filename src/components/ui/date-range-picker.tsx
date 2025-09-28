import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  dateStart: string;
  dateEnd: string;
  setDateStart: (val: string) => void;
  setDateEnd: (val: string) => void;
  className?: string;
  buttonClassName?: string;
};

export default function DateRangePicker({
  dateStart,
  dateEnd,
  setDateStart,
  setDateEnd,
  className,
  buttonClassName,
}: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    const from = dateStart ? new Date(dateStart) : undefined;
    const to = dateEnd ? new Date(dateEnd) : undefined;
    return { from, to };
  });

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    setDateStart(range?.from ? format(range.from, "yyyyMMdd") : "");
    setDateEnd(range?.to ? format(range.to, "yyyyMMdd") : "");
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-fit justify-start text-left font-normal",
              !date && "text-muted-foreground",
              buttonClassName
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
