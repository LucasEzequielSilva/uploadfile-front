/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
  './src/**/*.{js,jsx,ts,tsx}' //esto también es una forma de englobar subdirectorios
  ],
  theme: {
  extend: {
    colors:{
      primary:"#60a5fa",
      secondary:"#ddd6fe",
      acento:"#222"
    }
  }
  },
  variants: {},
  plugins: []
 }