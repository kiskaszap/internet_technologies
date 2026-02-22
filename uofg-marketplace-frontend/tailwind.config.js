/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        uofg: {
          blue: "#003865",
          gold: "#C8A600",
        },
      },
    },
  },
  plugins: [],
}
