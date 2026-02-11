/* import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://ecoventilation.se",

  output: "server", // required for server routes
  adapter: node({ mode: "standalone" }), // <-- add `mode`

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
 */



import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify"; // <-- LÄGG TILL!

export default defineConfig({
  site: "https://www.ecoventilation.se",
  
  // ===========================================
  // ✅ ÄNDRA TILL SERVER MED NETLIFY ADAPTER!
  // ===========================================
  output: "server",
  adapter: netlify(),

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