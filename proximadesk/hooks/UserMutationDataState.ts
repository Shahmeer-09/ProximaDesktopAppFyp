import { MutationKey, useMutationState } from "@tanstack/react-query";

export const UsermutationDatastate = (mutationkey: MutationKey) => {
  const data = useMutationState({
    filters: { mutationKey: mutationkey },
    select: (mutation) => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      variables: mutation.state.variables as any,
      status: mutation.state.status,
    }),
  });
  const latestvaraibles = data[data.length - 1];
  return { latestvaraibles };
};
