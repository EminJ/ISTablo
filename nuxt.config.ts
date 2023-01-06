import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;700&display=swap' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css' },
    ]
  },
  css: ["@/assets/css/main.css"],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
  serverMiddleware: [

    { path: "/api", handler: "~/server/index.ts" },
  ],
});
