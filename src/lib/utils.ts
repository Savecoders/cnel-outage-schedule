import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const dateFormatted = new Date(`${date}T00:00:00`).toLocaleDateString(
    "es-ES",
    {
      weekday: "long",
      day: "2-digit",
      month: "long",
    },
  );
  return dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);
}

export function currentDate() {
  return new Date()
    .toISOString()
    .replace(/T/, "_")
    .replace(/:/g, "-")
    .split(".")[0];
}
