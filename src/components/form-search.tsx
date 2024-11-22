import { SelectCriteria } from "@/components/select-criteria";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react";
import type { CriteriaSearch } from "@/enums/criteriaSearch";
import { useSchedule } from "@/hooks/use-schedule";

export default function FormSearch() {
  const [formState, setFormState] = useState({
    criteria: undefined as CriteriaSearch | undefined,
    value: "",
  });

  const { isLoading, error, data, refetch, getCachedData } = useSchedule(
    formState.criteria,
    formState.value,
    { enabled: true },
  );

  const [cachedResults, setCachedResults] = useState<any>(null);

  useEffect(() => {
    const cached = getCachedData();
    if (
      cached &&
      typeof cached === "object" &&
      "data" in cached &&
      "queryKey" in cached
    ) {
      const [_, lastCriteria, lastValue] = cached.queryKey as [
        string,
        CriteriaSearch,
        string,
      ];

      setFormState({
        criteria: lastCriteria,
        value: lastValue,
      });

      if (
        formState.criteria === lastCriteria &&
        formState.value === lastValue
      ) {
        setCachedResults(cached.data);
      } else {
        setCachedResults(null);
      }
    }
  }, [formState.criteria, formState.value]);

  const handleChangeCriteria = (criteria: string) => {
    setFormState((prev) => ({ ...prev, criteria: criteria as CriteriaSearch }));
  };

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, value: event.target.value }));
  };

  const handleSearch = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    refetch();
  };

  return (
    <div>
      <form className="flex flex-row gap-6">
        <SelectCriteria
          onChange={handleChangeCriteria}
          selectedCriteria={formState.criteria}
        />
        <Input onChange={handleChangeValue} value={formState.value} />
        <Button
          type="submit"
          aria-label="Buscar"
          disabled={isLoading || !formState.criteria || !formState.value}
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </form>
      {cachedResults && !isLoading && !data && (
        <div className="mt-4">
          <h3>Resultados en caché:</h3>
          <div>{JSON.stringify(cachedResults.transformed)}</div>
        </div>
      )}
      {isLoading && <div>Cargando...</div>}
      {error && <div>Error: {(error as Error).message}</div>}
      {data?.transformed && <div>{JSON.stringify(data.transformed)}</div>}
    </div>
  );
}
