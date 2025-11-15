/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
    "./views/**/*.{ejs,html}", // if using EJS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


