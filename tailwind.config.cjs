/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-custom": "#00AD09",
        "red-custom": "#FF0000",
        "black-custom": "#222222",
        "gray-custom": "#5F5F5F",
      },
      backgroundImage: {
        "main-background": "url('./src/assets/images/bg-image.svg')",
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
