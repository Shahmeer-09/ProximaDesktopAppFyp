import { onAuthenticate } from "@/actions/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const UserAuthentication = () => {
  const {data, isPending, refetch, isFetched, isError, isFetching } = useQuery({
    queryKey: ["user-auth"],
    queryFn: onAuthenticate,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  useEffect(() => {
    const navType = (window?.performance?.getEntriesByType("navigation")[0] as PerformanceNavigationTiming)?.type;
    if (navType === "reload") {
      refetch(); // only on full reload
    }
  }, [refetch]);

  return {data, isPending, refetch, isFetched, isError, isFetching};
};
