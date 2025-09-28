import { LoginRequest, LoginResponse } from "@/api/dto/auth";
import {
  apiErrorFactory,
  apiResultSuccess,
  baseUrl,
  customFetch,
  isApiSuccess,
  throwUnhandledApiError,
} from "@/api/functions";
import useCustomMutation from "@/api/useCustomMutation";
import useBrowserCookie from "@/hooks/useBrowserCookie";
import { useAppStore } from "@/store/store";
import { Cookies } from "@/types/app";
import { useQueryClient } from "@tanstack/react-query";

const LOGIN_MUTATION_QUERY_KEY = "login";

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const atCookie = useBrowserCookie(Cookies.ACCESSTOKEN);
  const rtCookie = useBrowserCookie(Cookies.REFRESHTOKEN);
  const setDisplayName = useAppStore((s) => s.setDisplayName);

  return useCustomMutation(
    [LOGIN_MUTATION_QUERY_KEY],
    async (vars: { form: LoginRequest }) => {
      const form = vars.form;

      const rsp = await customFetch(`${baseUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (rsp.status === 200) {
        const data = await rsp.json();
        return apiResultSuccess(data.data as LoginResponse);
      }

      if (rsp.status === 403 || rsp.status === 401) {
        const data = await rsp.json();
        return apiErrorFactory(data);
      }

      return throwUnhandledApiError(rsp);
    },
    {
      onMutate: async (_payload) => {
        const loginCache = queryClient.getQueryData([LOGIN_MUTATION_QUERY_KEY]);
        return { previous: loginCache };
      },
      onError: (_err, _deletedMetadata, context) => {
        queryClient.setQueryData([LOGIN_MUTATION_QUERY_KEY], context?.previous);
      },
      onSettled: async (rsp) => {
        if (rsp && isApiSuccess(rsp) && rsp.data) {
          if (rsp.data.memberName) setDisplayName(rsp.data.memberName);
          if (rsp.data.accessToken) atCookie.set(rsp.data.accessToken);
          if (rsp.data.refreshToken) rtCookie.set(rsp.data.refreshToken);
        }
        queryClient.setQueryData([LOGIN_MUTATION_QUERY_KEY], rsp);
        //queryClient.invalidateQueries({ queryKey: [MY_INFO_QUERY_KEY] });
      },
    }
  );
};

export const useLoginQueryData = () => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData([LOGIN_MUTATION_QUERY_KEY]) as LoginResponse;
};

export default useLoginMutation;
