/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-primary": "#512bd4",
        "purple-primary-darker": "#4122aa",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "light",
  },
};
