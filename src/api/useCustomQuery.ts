import { defaultQueryOptions, handleApi } from "@/api/functions";
import { useAppStore } from "@/store/store";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

const useCustomQuery = <
  TData = unknown,
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<
    UseQueryOptions<TData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const setAppError = useAppStore((s) => s.setAppError);

  return useQuery<TData, TError, TData, TQueryKey>({
    queryKey,
    queryFn: () => handleApi(queryFn, setAppError),
    ...defaultQueryOptions,
    ...options,
  });
};

export default useCustomQuery;
