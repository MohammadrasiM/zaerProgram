/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        10: "10px",
        20: "20px",
      },
      boxShadow: {
        card: "rgb(99 99 99 / 15%) 0px 2px 8px 0px",
        cardDark: "rgb(0 0 0 / 15%) 0px 2px 8px 0px",
        product: "rgb(0 0 0 /15%) 0px 2px 2px,rgb(0 0 0 / 15%) 2px 0px 2px ",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
