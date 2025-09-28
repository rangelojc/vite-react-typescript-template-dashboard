import { baseUrl, fetchJson } from "@/api/functions";
import useCustomMutation from "@/api/useCustomMutation";
import { useQueryClient } from "@tanstack/react-query";

const SAMPLE_MUTATION_QUERY_KEY = "sample";

const useSampleMutation = () => {
  const queryClient = useQueryClient();

  return useCustomMutation(
    [SAMPLE_MUTATION_QUERY_KEY],
    async (vars: { form: any }) => {
      const form = vars.form;

      const data = await fetchJson<{ success: boolean; data: any }>(
        `${baseUrl}/sample`,
        {
          method: "POST",
          body: JSON.stringify(form),
        }
      );

      if (!data.success) {
        throw new Error("Failed");
      }

      return data.data;
    },
    {
      onMutate: async (_payload) => {
        return { previous: 1 };
      },
      onError: (_err, _deletedMetadata, context) => {
        queryClient.setQueryData(
          [SAMPLE_MUTATION_QUERY_KEY],
          context?.previous
        );
      },
      onSettled: async () => {
        return await queryClient.invalidateQueries({
          queryKey: [SAMPLE_MUTATION_QUERY_KEY],
        });
      },
    }
  );
};

export default useSampleMutation;
