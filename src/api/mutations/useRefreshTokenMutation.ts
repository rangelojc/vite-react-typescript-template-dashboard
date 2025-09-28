import { RefreshResponse } from "@/api/dto/auth";
import { baseUrl, customFetch, throwUnhandledApiError } from "@/api/functions";
import useCustomMutation from "@/api/useCustomMutation";
import useBrowserCookie from "@/hooks/useBrowserCookie";
import { useAppStore } from "@/store/store";
import { Cookies } from "@/types/app";

const REFRESH_MUTATION_QUERY_KEY = "refresh-token";

const useRefreshTokenMutation = () => {
  const atCookie = useBrowserCookie(Cookies.ACCESSTOKEN);
  const rtCookie = useBrowserCookie(Cookies.REFRESHTOKEN);
  const setIsLoggedIn = useAppStore((s) => s.setIsLoggedIn);

  return useCustomMutation(
    [REFRESH_MUTATION_QUERY_KEY],
    async () => {
      const refreshToken = rtCookie.get();
      if (!refreshToken) throw new Error("No refresh token available");

      const rsp = await customFetch(`${baseUrl}/auth/refresh`, {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      });

      if (rsp.status === 200) {
        const data = await rsp.json();
        return data.data as RefreshResponse;
      }

      return throwUnhandledApiError(rsp);
    },
    {
      onSettled: (rsp) => {
        if (rsp && rsp.accessToken) {
          atCookie.set(rsp.accessToken);
          setIsLoggedIn(true);
        }
      },
    }
  );
};

export default useRefreshTokenMutation;
