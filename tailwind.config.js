/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        "bodoni-moda": ["Bodoni Moda", "serif"], // Add Bodoni Moda as a custom font family
        "poppins": ["Poppins", "sans-serif"], 
      },
      animation: {
        fadeinleft: "fadeInLeft 1s ease-in-out",
        fadeinright: "fadeInRight 1s ease-in-out",
        fadeoutright: "fadeOutRight 1s ease-in-out",
        fadeoutleft: "fadeOutLeft 1s ease-in-out",
        scalein: 'scalein 0.5s ease-out',
        fadeout: 'fadeout 0.5s ease-in',
      },
      keyframes: {
        fadeInLeft: {
          "0%": { opacity: 0, transform: "translateX(-50px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: 0, transform: "translateX(50px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeOutLeft: {
          "0%": { opacity: 1, transform: "translateX(0)" },
          "100%": { opacity: 0, transform: "translateX(-50px)" },
        },
        fadeOutRight: {
          "0%": { opacity: 1, transform: "translateX(0)" },
          "100%": { opacity: 0, transform: "translateX(50px)" },
        },
        scalein: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeout: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        }
      },
    },
  },
  plugins: [],
};
