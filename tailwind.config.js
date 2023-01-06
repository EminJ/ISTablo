module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'orange-main': '#edc275',
        'black-main': '#1e1e1e',
        'white-main': '#f2e1c5',
      },
    },
  },
  plugins: [],
}
