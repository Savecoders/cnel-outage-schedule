import { SelectCriteria } from "@/components/select-criteria";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { CriteriaSearch } from "@/enums/criteriaSearch";
import { useSchedule } from "@/hooks/use-schedule";

export default function FormSearch() {
  const [formState, setFormState] = useState({
    criteria: undefined as CriteriaSearch | undefined,
    value: "",
  });

  const { isLoading, error, transformedData, fetchSchedule } = useSchedule();

  const handleChangeCriteria = (criteria: string) => {
    setFormState((prev) => ({ ...prev, criteria: criteria as CriteriaSearch }));
  };

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, value: event.target.value }));
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchSchedule(formState.criteria as CriteriaSearch, formState.value);
  };

  return (
    <form className="flex flex-row gap-6" onSubmit={handleSearch}>
      <SelectCriteria onChange={handleChangeCriteria} />
      <Input onChange={handleChangeValue} />
      <Button
        type="submit"
        aria-label="Buscar"
        disabled={isLoading || !formState.criteria || !formState.value}
      >
        Buscar
      </Button>
    </form>
  );
}
