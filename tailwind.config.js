module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,html}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      raleway: [ 'Raleway', "sans-serif"],
      roboto_condensed: [ 'Roboto Condensed',"sans-serif"],
      roboto: [  'Roboto', "sans-serif"],
      source_sans_pro: [  'Source Sans Pro', 'sans-serif']
    },
    extend: {
      colors: {
        'green': '#5ECE7B',
        'bor_gray': '#1D1F22',
        'currency_text': '#1D1F22',
        'inStock-text': '#8D8F9A'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography')
  ],
}
