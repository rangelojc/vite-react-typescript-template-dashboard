import { baseUrl, customFetch } from "@/api/functions";
import useCustomQuery from "@/api/useCustomQuery";
import { useAuthProtectedQuery } from "@/hooks/useAuth";
import useBrowserCookie from "@/hooks/useBrowserCookie";
import { useAppStore } from "@/store/store";
import { Cookies } from "@/types/app";

export const AUTH_STATUS_QUERY_KEY = "/auth/status" as const;

const useAuthStatusQuery = () => {
  const lang = useAppStore((s) => s.language);
  const cookie = useBrowserCookie(Cookies.ACCESSTOKEN);
  const authProtectedQuery = useAuthProtectedQuery();

  return useCustomQuery(
    [AUTH_STATUS_QUERY_KEY],
    () =>
      authProtectedQuery(
        () =>
          customFetch(`${baseUrl}/auth/status`, {
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

export default useAuthStatusQuery;
