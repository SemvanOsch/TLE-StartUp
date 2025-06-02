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
    },
  },
  plugins: [],
}

