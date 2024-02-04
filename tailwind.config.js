/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "white",
        none: "nonde",
      },
      borderWidth: {
        1: "1px",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr)",
        8: "repeat(8, minmax(0, 1fr)",  /*tailwind template rows only go up to 6*/
      }
    },
  },
  plugins: [],
}

