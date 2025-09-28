import { baseUrl, customFetch, throwUnhandledApiError } from "@/api/functions";
import { ListResponse, PaginationRequest } from "@/api/types";
import useCustomQuery from "@/api/useCustomQuery";
import { createPaginationRequest } from "@/functions/factories";
import useLogoutOnForbidden from "@/hooks/useLogoutOnForbidden";

export const SAMPLE_QUERY_KEY = "sample" as const;

const useSampleQuery = (payload: PaginationRequest) => {
  const logoutOnForbidden = useLogoutOnForbidden();
  const { query } = createPaginationRequest(payload);

  return useCustomQuery<ListResponse<any[]>>([SAMPLE_QUERY_KEY], async () => {
    const rsp = await customFetch(`${baseUrl}/managers?${query}`, {
      method: "GET",
      credentials: "include",
    });

    if (rsp.status === 200) {
      const data = await rsp.json();
      return data;
    }

    if (rsp.status === 401) {
      logoutOnForbidden();
      return;
    }

    return throwUnhandledApiError(rsp);
  });
};

export default useSampleQuery;
