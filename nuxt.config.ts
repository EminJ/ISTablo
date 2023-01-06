import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  css: ["@/assets/css/tailwind.css"],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
  serverMiddleware: [

    { path: "/api", handler: "~/server/index.ts" },
  ],
});
