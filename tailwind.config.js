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
        'gray-background': '#212426',
        'gray-primary': '#232527',
        'gray-main': '#c4c4c4',
      },
      width: {
        '98': '98%',
      }
    },
  },
  plugins: [],
}
