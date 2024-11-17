import type { ApiSchedule } from "@/types/api-schedule.type";

export class CnelScheduleService {
  private readonly API_URL = process.env.CNEL_API_URL;

  async getSchedule(criteriaType: string, value: string): Promise<ApiSchedule> {
    try {
      const response = await fetch(`${this.API_URL}/${criteriaType}/${value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: ApiSchedule = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching schedule: ${error}`);
    }
  }
}
