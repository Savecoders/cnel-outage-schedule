import { CriteriaSearch, criteriaSearchLabels } from "@/enums/criteriaSearch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function SelectCriteria({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  return (
    <Select onValueChange={onChange}>
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
