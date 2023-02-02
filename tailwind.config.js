/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./public/**/*.{html,js}", "./src/**/*.js"],
  theme: {
    screens:{
      'xs': '400px',
      ...defaultTheme.screens,
    }
  },
  plugins: [],
}
