import { SelectCriteria } from "@/components/select-criteria";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react";
import { CriteriaSearch } from "@/enums/criteriaSearch";
import { useSchedule, type ScheduleData } from "@/hooks/use-schedule";
import { customQueryClient } from "@/lib/query-client";
import type { TransformedNotification } from "@/types/transformed-schedule.type";
import Schedule from "./shedule";
import { Skeleton } from "./ui/skeleton";
import Danger from "./ui/danger";

export default function FormSearch() {
  const [formState, setFormState] = useState({
    criteria: CriteriaSearch.Id,
    value: "",
  });

  const { isLoading, error, data, refetch, getCachedData, invalidateCache } =
    useSchedule(customQueryClient, formState.criteria, formState.value, {
      enabled: false,
    });

  const [cachedResults, setCachedResults] = useState<ScheduleData | null>(null);

  useEffect(() => {
    const cached = getCachedData();
    if (cached?.queryKey && cached.state) {
      const [_, lastCriteria, lastValue] = cached.queryKey as [
        string,
        CriteriaSearch,
        string,
      ];

      setFormState((prev) => ({
        ...prev,
        criteria: lastCriteria,
        value: lastValue,
      }));

      if ("transformed" in cached.state) {
        setCachedResults(cached.state);
      }
    }
  }, []);

  const handleChangeCriteria = (criteria: string) => {
    setFormState((prev) => ({ ...prev, criteria: criteria as CriteriaSearch }));
  };

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const prevValue = event.target.value;

    if (/^\d*$/.test(prevValue)) {
      // only numbers
      setFormState((prev) => ({ ...prev, value: prevValue }));
    }
  };

  const handleSearch = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await invalidateCache();
    await refetch();
  };

  return (
    <>
      <form className="flex flex-col gap-6 w-full md:flex-row">
        <SelectCriteria
          onChange={handleChangeCriteria}
          selectedCriteria={formState.criteria}
        />
        <Input
          aria-placeholder="Identificación"
          placeholder="Identificación"
          onChange={handleChangeValue}
          value={formState.value}
        />
        <Button
          type="submit"
          aria-label="Buscar"
          disabled={isLoading || !formState.criteria || !formState.value}
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </form>
      {isLoading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
        </div>
      ) : (
        <>
          {error && <Danger message={error.message} error="Error" />}

          {data?.transformed?.notificaciones && (
            <Schedule schedule={data.transformed?.notificaciones[0]} />
          )}

          {!data?.transformed?.notificaciones &&
            !error &&
            cachedResults?.transformed?.notificaciones?.[0] && (
              <Schedule
                schedule={
                  cachedResults.transformed
                    .notificaciones[0] as TransformedNotification
                }
              />
            )}
        </>
      )}
    </>
  );
}
