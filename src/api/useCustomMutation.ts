import { defaultQueryOptions, handleApi } from "@/api/functions";
import { useAppStore } from "@/store/store";
import {
  MutationKey,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

// Error-handling wrapper
const useCustomMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  mutationKey: MutationKey,
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationKey" | "mutationFn"
  >
) => {
  const setAppError = useAppStore((s) => s.setAppError);

  return useMutation<TData, TError, TVariables, TContext>({
    mutationKey,
    mutationFn: async (variables: TVariables) =>
      handleApi(() => mutationFn(variables), setAppError),
    ...defaultQueryOptions,
    ...options,
  });
};

export default useCustomMutation;
