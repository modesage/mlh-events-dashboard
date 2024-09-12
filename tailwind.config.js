/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customLightGray: '#353535',
        customDarkGray : '#202124',
        customBlack : '#171717',
      }
    },
  },
  plugins: [],
}