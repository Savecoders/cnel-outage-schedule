export interface TransformedSchedule {
  resp: string;
  mensaje: string | null;
  mensajeError: string | null;
  extra: any | null;
  notificaciones: TransformedNotification[];
}

export interface DateRange {
  horaDesde: string;
  horaHasta: string;
}

export interface TransformedPlanificationDetail {
  [date: string]: Array<DateRange>;
}

export interface TransformedNotification {
  idUnidadNegocios: number;
  cuentaContrato: string;
  alimentador: string;
  cuen: string;
  direccion: string;
  fechaRegistro: string;
  detallePlanificacion: TransformedPlanificationDetail;
}
