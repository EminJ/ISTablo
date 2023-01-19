// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    BaseUrl:'http://localhost:1000'
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Istanbul Tablo',
      meta: [
        { name: 'ISTablo', content: 'Tablo için Satış Merkezi..' }
      ],
      link: [
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;700&display=swap'},
        {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css'}
      ]
    }
  },
  modules: [
    '@pinia/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  
})
