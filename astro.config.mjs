// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  output: "server",
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

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    maxDuration: 8,
    imageService: true,
    imagesConfig: {
      sizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      domains: ["images.unsplash.com"],
    },
    isr: true,
  }),
});
