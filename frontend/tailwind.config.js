
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix-red': '#E50914',
        'netflix-red-dark': '#B81D24',
        'netflix-black': '#141414',
        'netflix-grey': '#808080',
        'netflix-white': '#FFFFFF',
        'netflix-light-grey': '#E5E5E5',
      },
    },
  },
  plugins: [],
}
