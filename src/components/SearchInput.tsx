import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function SearchInput({ className, ...props }: SearchInputProps) {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className={cn("pl-9 md:w-lg", className)}
        type="search"
        placeholder={t("search")}
        {...props}
      />
    </div>
  );
}
