module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        sans: ["Josefin Sans", "sans-serif"],
        alata: ["Alata"],
      },
      letterSpacing: {
        widest: ".25em",
      },
    },
  },
  plugins: [],
};
