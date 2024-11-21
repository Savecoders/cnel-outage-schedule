import type { CriteriaSearch } from "@/enums/criteriaSearch";
import scheduleTransformer from "@/lib/schedule-transformer";
import { CnelScheduleService } from "@/services/cnel-schedule.service";
import type { ApiSchedule } from "@/types/api-schedule.type";
import type { TransformedSchedule } from "@/types/transformed-schedule.type";
import { useEffect, useState } from "react";

export interface ScheduleState {
  isLoading: boolean;
  error: string | null;
  data: ApiSchedule | null;
  transformedData: TransformedSchedule | null;
}

export function useSchedule() {
  const [state, setState] = useState<ScheduleState>({
    isLoading: false,
    error: null,
    data: null,
    transformedData: null,
  });

  const fetchSchedule = async (criteria: CriteriaSearch, value: string) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));

    try {
      // Fetch the data with the criteria and value
      const scheduleService = new CnelScheduleService();
      const data = await scheduleService.getSchedule(criteria, value);

      // Transform the data
      const transformedData = data ? scheduleTransformer.transform(data) : null;

      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        data,
        transformedData,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        data: null,
        error: error as string,
      }));
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  return {
    ...state,
    fetchSchedule,
  };
}
