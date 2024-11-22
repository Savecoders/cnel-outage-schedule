import { CriteriaSearch, criteriaSearchLabels } from "@/enums/criteriaSearch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SelectCriteriaProps {
  onChange: (value: string) => void;
  selectedCriteria?: CriteriaSearch;
}

export function SelectCriteria({
  onChange,
  selectedCriteria,
}: SelectCriteriaProps) {
  return (
    <Select
      onValueChange={onChange}
      defaultValue={selectedCriteria}
      value={selectedCriteria}
    >
      <SelectTrigger>
        <SelectValue
          placeholder="Seleciona un criterio de búsqueda"
          aria-label="Seleciona un criterio de búsqueda"
        />
      </SelectTrigger>
      <SelectContent>
        {criteriaSearchLabels.map(({ value, label }) => (
          <SelectItem key={value} value={value} aria-label={label}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
