import {
  apiErrorFactory,
  apiResultSuccess,
  baseUrl,
  customFetch,
  throwUnhandledApiError,
} from "@/api/functions";
import useCustomMutation from "@/api/useCustomMutation";
import { useQueryClient } from "@tanstack/react-query";
import { UserUpdateRequest } from "../dto/users";
import { USERS_QUERY_KEY } from "../queries/useUsersQuery";

const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useCustomMutation(
    [USERS_QUERY_KEY],
    async (vars: { form: UserUpdateRequest; id: number }) => {
      const rsp = await customFetch(`${baseUrl}/admin/users/${vars.id}`, {
        method: "PATCH",
        body: JSON.stringify(vars.form),
        credentials: "include",
      });

      if (rsp.status === 200) {
        return apiResultSuccess();
      }

      if (rsp.status === 401 || rsp.status === 400) {
        const data = await rsp.json();
        return apiErrorFactory(data);
      }

      return throwUnhandledApiError(rsp);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      },
    }
  );
};

export default useUpdateUserMutation;
