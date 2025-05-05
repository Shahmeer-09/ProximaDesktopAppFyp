import {
    MutationKey,
    MutateFunction,
    useMutation,
    // useQueryClient,
  } from "@tanstack/react-query";
  import { toast } from "sonner";
  export const useMutationData = <TData, TError, TVariables>(
    mutationKey: MutationKey,
    mutationFunc: MutateFunction<TData, TError, TVariables>,
    onSuccess?: () => void
  ) => {
    // const queryClient = useQueryClient(); // ✅ Use existing QueryClient
    const { mutate, isPending } = useMutation<TData, TError, TVariables>({
      mutationKey,
      mutationFn: mutationFunc,
      onSuccess: (data) => {
        if (onSuccess) onSuccess();
        const status = (data as { status: number })?.status;
        return toast(status === 200 ? "Success" : "Error", 
          // description: (data as { message: string }).message,
        );
      },
    //   onSettled: () => {
    //     if (queryKey) queryClient.invalidateQueries({ queryKey: [queryKey] });
    //   },
    });
    return { mutate, isPending };
  };
  