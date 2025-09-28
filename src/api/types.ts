export type APIResult<T> =
  | { success: true; data?: T }
  | { success: false; error: APIErrorResponse };

export interface APIResultSuccess<T> {
  success: true;
  data?: T;
}

export interface APIResultError {
  success: false;
  error: APIErrorResponse;
}
export interface APIErrorResponse {
  status: number;
  error: string;
}

export interface PaginationRequest {
  page?: number;
  pageSize?: number;
  search?: string;
  searchField?: string;
  sortBy?: string;
  sortOrder?: string;
  dateStart?: string;
  dateEnd?: string;
}

export interface TablePagination {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface ListResponse<T> {
  data: T;
  pagination: TablePagination;
}

export interface GetAuthStatusResponse {
  authStatus: boolean;
}
