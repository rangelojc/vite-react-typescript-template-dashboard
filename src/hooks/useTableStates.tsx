import useDelay from "@/hooks/useDelay";
import { useCallback, useState } from "react";

type UseTableStatesOptions = {
  defaultPage?: number;
  defaultSearch?: string;
  defaultSearchField?: string;
  defaultSortField?: string;
  defaultSortOrder?: "ASC" | "DESC";
  defaultDate?: string;
  defaultDateStart?: string;
  defaultDateEnd?: string;
};

export default function useTableStates({
  defaultPage = 1,
  defaultSearch = "",
  defaultSearchField = "",
  defaultSortField = "",
  defaultSortOrder = "ASC",
  defaultDate = "",
  defaultDateStart = "",
  defaultDateEnd = "",
}: UseTableStatesOptions = {}) {
  const [page, setPage] = useState(defaultPage);
  const [search, setsearch] = useState(defaultSearch);
  const [searchField, setSearchField] = useState(defaultSearchField);
  const [sortField, setSortField] = useState(defaultSortField);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">(defaultSortOrder);
  const [date, setDate] = useState(defaultDate);
  const [dateStart, setDateStart] = useState(defaultDateStart);
  const [dateEnd, setDateEnd] = useState(defaultDateEnd);

  const delay = useDelay(1000);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      delay(() => {
        setsearch(e.target.value);
        setPage(1);
      });
    },
    [delay]
  );

  return {
    page,
    search,
    searchField,
    sortField,
    sortOrder,
    date,
    dateStart,
    dateEnd,
    setPage,
    setsearch,
    setSearchField,
    setSortField,
    setSortOrder,
    setDate,
    setDateStart,
    setDateEnd,
    handleSearchChange,
  };
}
