import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.ecoventilation.se",
  output: "static",   // 👈 VERY IMPORTANT

  integrations: [
    react(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
