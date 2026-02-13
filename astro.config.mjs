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


import node from "@astrojs/node";


export default defineConfig({
  site: "https://www.ecoventilation.se",

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

  adapter: node({
    mode: "standalone",
  }),
});

/* 
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // eller netlify, node

export default defineConfig({
  output: 'server',
  adapter: vercel(), // eller netlify(), node()
}); */