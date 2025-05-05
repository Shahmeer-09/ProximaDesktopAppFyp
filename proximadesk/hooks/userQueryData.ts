import { Enabled, QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";

export const useQueryData = (queryfn:QueryFunction, queryKey:QueryKey, enable?:Enabled) => {
    const {data, isPending, refetch, isFetched, isError, isFetching } = useQuery({
        queryKey,
        queryFn:queryfn,
        enabled:enable
    })
    return {data, isPending, refetch, isFetched, isError, isFetching}
};