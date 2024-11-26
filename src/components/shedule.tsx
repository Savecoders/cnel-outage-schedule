import type { TransformedNotification } from "@/types/transformed-schedule.type";
import CardOutage from "./card-outage";

export default function Schedule({
  schedule,
}: {
  schedule: TransformedNotification;
}) {
  const {
    cuentaContrato,
    alimentador,
    direccion,
    fechaRegistro,
    detallePlanificacion,
  } = schedule;

  const dates = Object.keys(detallePlanificacion);

  return (
    <>
      <article
        className="flex gap-2 flex-col p-8 rounded-lg border"
        aria-label="Planificación"
      >
        <h1 className="text-2xl font-bold">{`Cuenta: ${cuentaContrato}`}</h1>
        <p className="text-xl font-normal text-zinc-500">{`Alimentador: ${alimentador}`}</p>
        <p className="text-xl font-normal text-zinc-500">{`Dirección: ${direccion}`}</p>
        <p className="text-xl font-normal text-zinc-500">{`Fecha de Registro: ${fechaRegistro}`}</p>
        <div className="grid grid-cols-schedule gap-4 max-w-3xl">
          {dates.map((date) => (
            <CardOutage
              date={date}
              range={detallePlanificacion[date]}
              key={date}
            />
          ))}
        </div>
      </article>
    </>
  );
}
