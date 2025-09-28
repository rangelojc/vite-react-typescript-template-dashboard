import { baseUrl, customFetch } from "@/api/functions";
import useCustomMutation from "@/api/useCustomMutation";
import { useAuthProtectedQuery } from "@/hooks/useAuth";
import useBrowserCookie from "@/hooks/useBrowserCookie";
import { Cookies } from "@/types/app";

const useLogoutMutation = () => {
  const authProtectedQuery = useAuthProtectedQuery();
  const atCookie = useBrowserCookie(Cookies.ACCESSTOKEN);
  const rtCookie = useBrowserCookie(Cookies.REFRESHTOKEN);

  return useCustomMutation(
    ["logout"],
    () =>
      authProtectedQuery(() =>
        customFetch(`${baseUrl}/auth/logout`, {
          method: "POST",
          credentials: "include",
          headers: {
            ...atCookie.getHttpHeader().headers,
          },
        })
      ),
    {
      onSettled: () => {
        atCookie.remove();
        rtCookie.remove();
      },
    }
  );
};

export default useLogoutMutation;
