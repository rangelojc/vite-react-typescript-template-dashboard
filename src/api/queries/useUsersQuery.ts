import { baseUrl, customFetch } from "@/api/functions";
import { ListResponse, PaginationRequest } from "@/api/types";
import useCustomQuery from "@/api/useCustomQuery";
import { createPaginationRequest } from "@/functions/factories";
import { useAuthProtectedQuery } from "@/hooks/useAuth";
import useBrowserCookie from "@/hooks/useBrowserCookie";
import { useAppStore } from "@/store/store";
import { Cookies } from "@/types/app";
import { User } from "../dto/users";

export const USERS_QUERY_KEY = "users" as const;

const useUsersQuery = (payload: PaginationRequest) => {
  const lang = useAppStore((s) => s.language);
  const { query } = createPaginationRequest(payload);
  const cookie = useBrowserCookie(Cookies.ACCESSTOKEN);

  const authProtectedQuery = useAuthProtectedQuery();

  return useCustomQuery<ListResponse<User[]>>(
    [USERS_QUERY_KEY],
    () =>
      authProtectedQuery(
        () =>
          customFetch(`${baseUrl}/admin/users?${query}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "X-Language": lang,
              ...cookie.getHttpHeader().headers,
            },
          }),
        async (rsp) => {
          const json = await rsp.json();
          return json.data;
        }
      ),
    {
      refetchOnMount: "always",
      refetchOnWindowFocus: true,
    }
  );
};

export default useUsersQuery;
