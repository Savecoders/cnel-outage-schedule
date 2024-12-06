import type { DateRange } from "@/types/transformed-schedule.type";
import { Badge } from "./ui/badge";
import { formatDate } from "@/lib/utils";
interface propCardOutage {
  date: string;
  range: Array<DateRange>;
}

export default function CardOutage({ date, range }: propCardOutage) {
  return (
    <section
      className="flex flex-col gap-2 rounded-md border p-4 w-full"
      aria-label={date}
    >
      <h1 className="text-xl font-medium">{formatDate(date)}</h1>
      <p className="font-normal text-zinc-400 text-lg">Cortes Programados</p>
      <div className="flex flex-wrap gap-4">
        {range.map((item) => (
          <aside
            className="text-sm font-normal text-zinc-300 p-2 rounded-md border w-fit hover:bg-zinc-800"
            key={`${item.horaDesde}-${item.horaHasta}`}
          >
            {item.horaDesde}h - {item.horaHasta}h
          </aside>
        ))}
      </div>
    </section>
  );
}
