import useLogoutMutation from "@/api/mutations/useLogoutMutation";
import { useAppStore } from "@/store/store";
import { RouteDefinition } from "@/types/app";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const INVALID_ACCOUNT = "invalidAccount";
export const UNAUTHENTICATED = "notLoggedIn";

const useLogoutOnForbidden = () => {
  const { mutateAsync: logout } = useLogoutMutation();
  const navigate = useNavigate();
  const setIsLoggedIn = useAppStore((s) => s.setIsLoggedIn);

  return useCallback(async () => {
    await logout();
    setIsLoggedIn(false);
    navigate({
      pathname: RouteDefinition.LOGIN,
      search: `?${INVALID_ACCOUNT}=true`,
    });
  }, [logout]);
};

export default useLogoutOnForbidden;
