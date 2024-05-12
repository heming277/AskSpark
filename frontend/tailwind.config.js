/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark-gray': '#121212', // Adjust the color code to your preferred dark gray
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};