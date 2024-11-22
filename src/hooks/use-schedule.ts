import type { CriteriaSearch } from "@/enums/criteriaSearch";
import { createQueryClient } from "@/lib/query-client";
import scheduleTransformer from "@/lib/schedule-transformer";
import { CnelScheduleService } from "@/services/cnel-schedule.service";
import type { ApiSchedule } from "@/types/api-schedule.type";
import type { TransformedSchedule } from "@/types/transformed-schedule.type";
import {
  useQuery,
  type QueryKey,
  type QueryState,
} from "@tanstack/react-query";

export interface ScheduleQuery {
  queryKey: QueryKey;
  data: QueryState<TransformedSchedule | null, ApiSchedule | null> | undefined;
}

export function useSchedule(
  criteria?: CriteriaSearch,
  value?: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
  },
) {
  const DEFAULT_HOUR = 1000 * 60 * 60;
  const queryClient = createQueryClient();

  const getCachedData = (): ScheduleQuery | null | undefined => {
    if (criteria && value) {
      return queryClient.getQueryData<ScheduleQuery>([
        "schedule",
        criteria,
        value,
      ]);
    }

    const queries = queryClient.getQueriesData<ScheduleQuery>({
      queryKey: ["schedule"],
    });
    if (queries.length > 0) {
      const [latestQueryKey, latestData] = queries[queries.length - 1];
      return {
        queryKey: latestQueryKey,
        data: latestData?.data,
      };
    }
    return null;
  };

  const query = useQuery(
    {
      queryKey: ["schedule", criteria, value],
      queryFn: async () => {
        // no criteria or value, return null
        if (!criteria || !value) return null;

        const scheduleService = new CnelScheduleService();
        const data = await scheduleService.getSchedule(criteria, value);
        return {
          raw: data,
          transformed: data ? scheduleTransformer.transform(data) : null,
        };
      },

      // automatically enable the query if the criteria and value are provided
      enabled: options?.enabled ?? Boolean(criteria && value),
      // default stale time is 1 hour
      staleTime: options?.staleTime ?? DEFAULT_HOUR,
      refetchOnReconnect: true, // refetch when the network reconnects
      refetchOnMount: true, // refetch when the query is mounted
    },
    queryClient,
  );

  return {
    ...query,
    getCachedData,
  };
}
