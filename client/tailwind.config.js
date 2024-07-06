const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./public/**/*.{html,js}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'xs': '400px',
      'xs450': '450px',
      'xs480': '480px',
      'sm': '500px',
      '2sm': '600px',
      'md750': '750px',
      'md800': '800px',
      'md': '850px',
      'md900': '900px',
      'lg': '1100px',
      'xl': '1400px',
    },
    extend: {
      sizes: {
        "header-height": "var(--header-height)"
      },
      boxShadow: {
        'cardShadow': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      },
      keyframes: {
        svgAnimation: {
          '0%': {
            transform: 'translateX(20%)'
          },

          '20%': {
            transform: 'translateX(-20%)'
          },

          '40%': {
            transform: 'translateX(10%)'
          },

          '60%': {
            transform: 'translateX(-10%)'
          },

          '80%': {
            transform: 'translateX(5%)'
          },

          '100%': {
            transform: 'translateX(0%)'
          }
        }
      }
    }
  },
  plugins: [],
}
