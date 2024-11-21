// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  env: {
    schema: {
      CNEL_API_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PORT: envField.number({
        context: "server",
        access: "public",
        default: 4321,
      }),
    },
    validateSecrets: true,
  },
});
