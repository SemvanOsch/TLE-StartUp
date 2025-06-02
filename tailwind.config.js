/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            ArialRounded: ['Arial Rounded MT Bold'],
        },
        colors: {
            'background' : '#0F002A',
            'text' : '#E6E6E6',
        },
      animation: {
        moveStars: "moveStars 100s linear infinite",
      },
      keyframes: {
        moveStars: {
          "0%": { backgroundPosition: "0 0, 50px 50px" },
          "100%": { backgroundPosition: "1000px 1000px, 1050px 1050px" },
        },
      },
    },
  },
  plugins: [],
}

