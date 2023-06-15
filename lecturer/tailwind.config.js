/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xxs: "0",
      xs: "300px",
      sm: "620px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    extend: {},
    // fontSize: {
    // sm: "0.8rem",
    // base: "0.9rem",
    // xl: "1.25rem",
    // "2xl": "1.563rem",
    // "3xl": "1.953rem",
    // "4xl": "2.441rem",
    // "5xl": "3.052rem",
    // },
  },

  plugins: [],
};
