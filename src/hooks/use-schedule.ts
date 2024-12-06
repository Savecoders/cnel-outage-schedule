import type { CriteriaSearch } from "@/enums/criteriaSearch";
import scheduleTransformer from "@/lib/schedule-transformer";
import { CnelScheduleService } from "@/services/cnel-schedule.service";
import type { ApiSchedule } from "@/types/api-schedule.type";
import type { TransformedSchedule } from "@/types/transformed-schedule.type";
import {
  type QueryClient,
  useQuery,
  type QueryKey,
  type ThrowOnError,
} from "@tanstack/react-query";

export interface ScheduleData {
  transformed: TransformedSchedule | null;
}

export interface ScheduleQuery {
  queryKey: QueryKey;
  state: ScheduleData;
}

export function useSchedule(
  queryClient: QueryClient,
  criteria?: CriteriaSearch,
  value?: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
  },
) {
  const DEFAULT_HOUR = 1000 * 60 * 60 * 3;

  const invalidateCache = async () => {
    if (criteria && value) {
      await queryClient.invalidateQueries({
        queryKey: ["schedule", criteria, value],
      });
    } else {
      queryClient.invalidateQueries({
        queryKey: ["schedule"],
      });
    }
  };

  const getCachedData = () => {
    if (criteria && value) {
      const cached = queryClient.getQueryData<ScheduleQuery>([
        "schedule",
        criteria,
        value,
      ]);
      return cached;
    }

    const queries = queryClient.getQueriesData<ScheduleQuery>({
      queryKey: ["schedule"],
    });

    //filter valid queries
    const validQueries = queries.filter(([_, data]) => data);

    if (validQueries.length > 0) {
      const [latestQueryKey, latestData] =
        validQueries[validQueries.length - 1];
      return {
        queryKey: latestQueryKey,
        state: latestData,
      };
    }

    return null;
  };

  const query = useQuery<ScheduleData | null>(
    {
      queryKey: ["schedule", criteria, value],
      queryFn: async (): Promise<ScheduleData | null> => {
        // no criteria or value, return null
        if (!criteria || !value) return null;

        try {
          const scheduleService = new CnelScheduleService();
          const data = await scheduleService.getSchedule(criteria, value);

          if (data.resp === "ERROR") {
            throw new Error(
              "No se encontraron datos con los criterios ingresados",
            );
          }
          return {
            transformed: data ? scheduleTransformer.transform(data) : null,
          };
        } catch (err) {
          throw new Error(
            "No se encontraron datos con los criterios ingresados",
          );
        }
      },

      // automatically enable the query if the criteria and value are provided
      enabled: options?.enabled ?? Boolean(criteria && value),
      staleTime: options?.staleTime ?? DEFAULT_HOUR,
      refetchInterval: DEFAULT_HOUR,
      refetchOnReconnect: true, // refetch when the network reconnects
      refetchOnMount: "always", // refetch when the query is mounted
    },
    queryClient,
  );

  return {
    ...query,
    getCachedData,
    invalidateCache,
  };
}
