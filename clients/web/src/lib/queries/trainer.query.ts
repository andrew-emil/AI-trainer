import { TRAINERS_QUERY_KEY } from "@/constants";
import { findAllTrainers } from "@/services/trainer";
import { queryOptions } from "@tanstack/react-query";

export const trainersQuery = (isActive?: boolean) =>
    queryOptions({
        queryKey: TRAINERS_QUERY_KEY.allTrainers,
        queryFn: () => findAllTrainers(isActive),
        staleTime: 60_000,
    });
