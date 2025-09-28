import { baseUrl, customFetch } from "@/api/functions";
import useCustomQuery from "@/api/useCustomQuery";
import { useAuthProtectedQuery } from "@/hooks/useAuth";
import useBrowserCookie from "@/hooks/useBrowserCookie";
import { useAppStore } from "@/store/store";
import { Cookies } from "@/types/app";

export const QUERY_KEY = "/test" as const;

const useSampleProtectedQuery = () => {
  const lang = useAppStore((s) => s.language);
  const cookie = useBrowserCookie(Cookies.ACCESSTOKEN);
  const authProtectedQuery = useAuthProtectedQuery();

  return useCustomQuery(
    [QUERY_KEY],
    () =>
      authProtectedQuery(
        () =>
          customFetch(`${baseUrl}/test`, {
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

export default useSampleProtectedQuery;
