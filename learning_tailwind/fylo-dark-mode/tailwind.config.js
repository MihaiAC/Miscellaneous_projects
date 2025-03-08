/** @type {import('tailwindcss').Config} */
/* Omitted variants - it seems it's no longer needed? */
module.exports = {
  content: ["./**/*.html", "./src/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "logo-dark-mode": "url('../images/logo-dark-mode.svg')",
        "logo-light-mode": "url('../images/logo-light-mode.svg')",
        "curvy-dark-mode": "url('../images/bg-curvy-dark-mode.svg')",
        "curvy-light-mode": "url('../images/bg-curvy-light-mode.svg')",
      }),
    },
  },
  fontFamily: {
    sans: ["Raleway", "sans-serif"],
    opensans: ["Open Sans", "sans-serif"],
  },

  plugins: [],
};
