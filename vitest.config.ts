/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["test/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    // include alias with src tsconfig
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
