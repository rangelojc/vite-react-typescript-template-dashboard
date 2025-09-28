import { customFetch, handleApi } from "@/api/functions";
import { useAppStore } from "@/store/store";

const useApiClient = () => {
  const setAppError = useAppStore((s) => s.setAppError);

  const getSettings = () =>
    handleApi(async () => {
      const response = await customFetch("/settings", { method: "GET" });
      return response.json();
    }, setAppError);

  // Add more API methods using the same pattern
  return {
    getSettings,
  };
};

export default useApiClient;
