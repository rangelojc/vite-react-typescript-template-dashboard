// src/components/Pagination.tsx
import { TablePagination } from "@/api/types";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadcnPagination,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  totalCount: number;
  pageSize: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  className?: string;
}

export default function Pagination({
  totalCount,
  pageSize,
  page,
  setPage,
  className,
}: PaginationProps) {
  const { t } = useTranslation();
  const totalPages = Math.ceil(totalCount / pageSize);

  const visiblePages = (): (number | "...")[] => {
    if (totalPages <= 5) return [...Array(totalPages)].map((_, i) => i + 1);

    if (page <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (page >= totalPages - 2)
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];

    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  const renderPage = (p: number | "...", i: number) => {
    if (p === "...") {
      return (
        <PaginationItem key={`ellipsis-${i}`}>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return (
      <PaginationItem key={p}>
        <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
          {p}
        </PaginationLink>
      </PaginationItem>
    );
  };

  return (
    <div
      className={cn("my-2 p-1 rounded w-fit !mx-0 bg-background/30", className)}
    >
      <ShadcnPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && setPage(page - 1)}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            >
              {t("previous")}
            </PaginationPrevious>
          </PaginationItem>

          {visiblePages().map(renderPage)}

          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPages && setPage(page + 1)}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            >
              {t("next")}
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </ShadcnPagination>
    </div>
  );
}

export const PaginationStatus = ({
  data,
  className,
}: {
  data?: TablePagination;
  className?: string;
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={cn("flex items-center justify-end mt-2 mb-1 pr-2", className)}
    >
      <p className="text-xs text-muted-foreground">
        {t("pageSizeParagraph", {
          count: data?.pageSize,
          totalCount: data?.totalCount,
        })}
      </p>
    </div>
  );
};
