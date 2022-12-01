/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#7E56DA",
        "brand-hover": "#714dc4",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "light",
  },
};
