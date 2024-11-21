import { SelectCriteria } from "@/components/select-criteria";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { CriteriaSearch } from "@/enums/criteriaSearch";
import type { ApiSchedule } from "@/types/api-schedule.type";
import { CnelScheduleService } from "@/services/cnel-schedule.service";
import type { TransformedSchedule } from "@/types/transformed-schedule.type";
import scheduleTransformer from "@/lib/schedule-transformer";

export default function FormSearch() {
  const [formState, setFormState] = useState({
    criteria: undefined as CriteriaSearch | undefined,
    value: "",
  });

  const [searchState, setSearchState] = useState({
    isLoading: false,
    error: null as string | null,
    data: null as ApiSchedule | null,
    transformedData: null as TransformedSchedule | null,
  });

  const handleChangeCriteria = (criteria: string) => {
    setFormState((prev) => ({ ...prev, criteria: criteria as CriteriaSearch }));
  };

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, value: event.target.value }));
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const scheduleService = new CnelScheduleService();
      const data = await scheduleService.getSchedule(
        formState.criteria as string,
        formState.value,
      );

      const transformedData = data ? scheduleTransformer.transform(data) : null;

      setSearchState((prev) => ({
        ...prev,
        data,
        transformedData,
        error: null,
      }));
    } catch (error) {
      setSearchState((prev) => ({
        ...prev,
        error: error as string,
        data: null,
        transformedData: null,
      }));
    } finally {
      setSearchState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <form className="flex flex-row gap-6" onSubmit={handleSearch}>
      <SelectCriteria onChange={handleChangeCriteria} />
      <Input onChange={handleChangeValue} />
      <Button
        type="submit"
        aria-label="Buscar"
        disabled={
          searchState.isLoading || !formState.criteria || !formState.value
        }
      >
        Buscar
      </Button>
    </form>
  );
}
