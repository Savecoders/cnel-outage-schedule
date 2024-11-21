import { CNEL_API_URL } from "astro:env/client";
import type { ApiSchedule } from "@/types/api-schedule.type";

export class CnelScheduleService {
  private readonly API_URL = CNEL_API_URL;
  private readonly TIMEOUT = 10000;
  private readonly abortController = new AbortController();

  async getSchedule(criteriaType: string, value: string): Promise<ApiSchedule> {
    try {
      const timewait = setTimeout(
        () => this.abortController.abort(),
        this.TIMEOUT,
      );

      const response = await fetch(`${this.API_URL}/${value}/${criteriaType}`, {
        method: "GET",
        signal: this.abortController.signal,
      });

      clearTimeout(timewait); // Clear the timeout to prevent memory leak

      if (!response.ok) {
        throw new Error(`Error fetching schedule: ${response.statusText}`);
      }

      const data: ApiSchedule = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching schedule: ${error}`);
    }
  }
}
