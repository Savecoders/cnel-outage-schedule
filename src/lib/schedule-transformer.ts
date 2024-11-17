import type {
  TransformedSchedule,
  TransformedNotification,
  TransformedPlanificationDetail,
} from "@/types/transformed-schedule.type";
import type { ApiSchedule, PlanningDetail } from "@/types/api-schedule.type";

interface ScheduleTransformer {
  transform(data: ApiSchedule): TransformedSchedule | null;
}

class ScheduleTransformer implements ScheduleTransformer {
  private transformPlanningDetails(
    detallePlanificacion: PlanningDetail[],
  ): TransformedPlanificationDetail {
    return detallePlanificacion.reduce<TransformedPlanificationDetail>(
      (dateMap, { fechaHoraCorte, horaDesde, horaHasta }) => {
        const date = fechaHoraCorte.split(" ")[0];
        dateMap[date] ??= [];
        dateMap[date].push({ horaDesde, horaHasta });
        return dateMap;
      },
      {},
    );
  }

  transform(data: ApiSchedule): TransformedSchedule | null {
    if (!data?.resp || !data.notificaciones?.length) {
      return null;
    }

    const { resp, mensaje, mensajeError, extra, notificaciones } = data;
    const primaryNotification = notificaciones[0];

    const transformedNotification: TransformedNotification = {
      ...primaryNotification,
      detallePlanificacion: this.transformPlanningDetails(
        primaryNotification.detallePlanificacion,
      ),
    };

    return {
      resp,
      mensaje,
      mensajeError,
      extra,
      notificaciones: [transformedNotification],
    };
  }
}

export default new ScheduleTransformer();
