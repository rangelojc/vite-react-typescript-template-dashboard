import { PaginationRequest } from "@/api/types";

type PaginationWithQuery = {
  form: PaginationRequest;
  query: string;
};

export const createPaginationRequest = (
  payload: Partial<PaginationRequest> = {}
): PaginationWithQuery => {
  const form: PaginationRequest = {
    page: payload.page ?? 1,
    pageSize: payload.pageSize ?? 10,
    searchField: payload.searchField ?? "",
    search: payload.search ?? "",
    sortBy: payload.sortBy ?? "",
    sortOrder: payload.sortOrder ?? "",
  };

  const query = new URLSearchParams({
    page: String(form.page),
    limit: String(form.pageSize),
    searchField: form.searchField ?? "",
    search: form.search ?? "",
    sortBy: form.sortBy ?? "",
    sortOrder: form.sortOrder ?? "",
  }).toString();

  return { form, query };
};
