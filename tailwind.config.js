/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-300": "#c8c4fe",
        "primary-400": "#9b94fd",
        "primary-500": "#877EFF",
        "primary-600": "#5D5FEF",
        "primary-700": "#4a4cea",
        "secondary-500": "#FFB620",
        "off-white": "#D0DFFF",
        "dark-1": "#222",
        "dark-2": "#1B2430",
        "dark-3": "#29323e",
        "dark-4": "#343434",
        "dark-5": "#535353",
        "light-1": "#FFFFFF",
        "light-2": "#EFEFEF",
        "light-3": "#d8d8d8",
        "light-4": "#b5b5b5"
      },
      fontFamily: {
        "supreme-regular": ["Supreme-Regular", "sans"],
        "satoshi-medium": ["Satoshi-Medium", "sans"],
        // inter: ['Inter', 'sans-serif'],
        roboto: ["Roboto", "sans-serif"],
        patrik_hand: ["Patrick Hand", "cursive"]
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
