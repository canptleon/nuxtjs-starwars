/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{html,js,vue}',
  './components/**/*.{html,js,vue}'],
  theme: {
    extend: {
      colors: {
        'raisin' : '#262730',
        'test' : '#D8B4E2'
      },
    },
    fontFamily: {
      jediFont: ['JediFont'], 
      jediFont2: ['JediFont2'], 
    },
    screens: {
      'xl': {'max': '1440px'},
      'lg': {'max': '1200px'},
      'md': {'max': '992px'},
      'sm': {'max': '768px'},
      'xs': {'max': '576px'},
      'xxs': {'max': '390px'},
    }
  },
  plugins: [],
}