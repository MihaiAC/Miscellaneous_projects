/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./src/**/*.js"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1020px",
      xl: "1440px",
    },
    extend: {
      colors: {
        softBlue: "hsl(231, 69%, 69%)",
        softRed: "hsl(0, 94%, 66%)",
        grayBlue: "hsl(229, 8%, 60%)",
        darkBlue: "hsl(229, 31%, 21%)",
      },
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
      },
      backgroundImage: () => ({
        dots: "url(images/bg-dots.svg)",
      }),
    },
  },
  plugins: [],
};
