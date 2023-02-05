const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./public/**/*.{html,js}", "./src/**/*.js"],
  theme: {
    screens:{
      'xs': '400px',
      'sm': '500px',
      '2sm':'600px',
      'md': '850px',
      'lg': '1100px',
      'xl': '1400px',
    }
  },
  plugins: [],
}
