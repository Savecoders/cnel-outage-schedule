import scheduleTransformer from "@/lib/schedule-transformer";
import { describe, expect, it } from "vitest";

const data = {
  resp: "OK",
  mensaje: null,
  mensajeError: null,
  extra: null,
  notificaciones: [
    {
      idUnidadNegocios: 6,
      cuentaContrato: "200019701404",
      alimentador: "04FB150T21",
      cuen: "0400795859",
      direccion: "BLQ#12-MZ#1574S...",
      fechaRegistro: "2024-09-23 11:06:25.0",
      detallePlanificacion: [
        {
          alimentador: "04FB150T21",
          fechaCorte: "sábado, 16 de noviembre de 2024",
          horaDesde: "04:00",
          horaHasta: "08:00",
          comentario: "El corte se ha programado",
          fechaRegistro: "2024-11-14 09:36:25.0",
          fechaHoraCorte: "2024-11-16 04:00",
        },
        {
          alimentador: "04FB150T21",
          fechaCorte: "sábado, 16 de noviembre de 2024",
          horaDesde: "10:00",
          horaHasta: "14:00",
          comentario: "El corte se ha programado",
          fechaRegistro: "2024-11-14 09:36:25.0",
          fechaHoraCorte: "2024-11-16 10:00",
        },
        {
          alimentador: "04FB150T21",
          fechaCorte: "sábado, 16 de noviembre de 2024",
          horaDesde: "17:00",
          horaHasta: "21:00",
          comentario: "El corte se ha programado",
          fechaRegistro: "2024-11-14 09:36:25.0",
          fechaHoraCorte: "2024-11-16 17:00",
        },
        {
          alimentador: "04FB150T21",
          fechaCorte: "domingo, 17 de noviembre de 2024",
          horaDesde: "04:00",
          horaHasta: "08:00",
          comentario: "El corte se ha programado",
          fechaRegistro: "2024-11-14 09:36:40.0",
          fechaHoraCorte: "2024-11-17 04:00",
        },
        {
          alimentador: "04FB150T21",
          fechaCorte: "domingo, 17 de noviembre de 2024",
          horaDesde: "10:00",
          horaHasta: "14:00",
          comentario: "El corte se ha programado",
          fechaRegistro: "2024-11-14 09:36:40.0",
          fechaHoraCorte: "2024-11-17 10:00",
        },
        {
          alimentador: "04FB150T21",
          fechaCorte: "domingo, 17 de noviembre de 2024",
          horaDesde: "17:00",
          horaHasta: "21:00",
          comentario: "El corte se ha programado",
          fechaRegistro: "2024-11-14 09:36:40.0",
          fechaHoraCorte: "2024-11-17 17:00",
        },
      ],
    },
  ],
};

describe("ScheduleTransformer", () => {
  it("should transform the schedule data", () => {
    const transformed = scheduleTransformer.transform(data);
    console.log(JSON.stringify(transformed, null, 2));
  });
});
