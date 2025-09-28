import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface SearchInputWithFieldsProps
  extends InputHTMLAttributes<HTMLInputElement> {
  searchFields: { value: string; label: string }[];
  searchField: string;
  setSearchField: (field: string) => void;
}

export function SearchInputWithFields({
  className,
  searchFields,
  searchField,
  setSearchField,
  ...props
}: SearchInputWithFieldsProps) {
  const { t } = useTranslation();

  const isOneField = searchFields.length === 1;

  return (
    <div className="flex items-center">
      {/* Dropdown for selecting search field */}
      <Select
        value={searchField}
        onValueChange={(field) => setSearchField(field)}
      >
        <SelectTrigger
          className={cn(
            "w-[140px] h-9 text-xs rounded-r-none border-r-transparent -mr-[1px]",
            isOneField ? "pointer-events-none" : ""
          )}
        >
          <SelectValue placeholder={t("search_by")} />
        </SelectTrigger>
        <SelectContent>
          {searchFields.map((field) => (
            <SelectItem key={field.value} value={field.value}>
              {t(field.label)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Text input for search value */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className={cn(
            "pl-9 md:w-md rounded-l-none border-l-transparent",
            className
          )}
          type="search"
          placeholder={t("search")}
          {...props}
        />
      </div>
    </div>
  );
}
