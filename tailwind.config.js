/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        cool_grey: {
          light: "#3E5170",
          DEFAULT: "#3E4A5E",
        },
      },
      screens: {
        "3xl": "1720px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
