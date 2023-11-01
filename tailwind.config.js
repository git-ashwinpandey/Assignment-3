/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {},
    daisyui: {
      themes: ['light'],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

