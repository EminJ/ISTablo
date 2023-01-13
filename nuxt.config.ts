import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
     app: {
      head: {
        charset: 'utf-8',
        title: 'Istanbul Tablo',
        meta: [
          { name: 'description', content: 'Istanbul Tablo, Tablo Satış Sitesi..' }
        ],
        link: [
          {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;700&display=swap'},
          {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css'}
        ]
      }
    },
    css: ["@/assets/css/styles.css"],
    build: {
      postcss: {
        postcssOptions: require("./postcss.config.js"),
      },
    },
    serverMiddleware: [
      { path: "/api", handler: "~/server/index.ts" },
    ],
})
