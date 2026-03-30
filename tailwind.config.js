/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f6f0e5",
        parchment: "#efe4d2",
        ink: "#16120f",
        olive: "#253328",
        brass: "#b6883d",
        cedar: "#8b5e3c",
        stone: "#5d534a",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Iowan Old Style"', '"Palatino Linotype"', "serif"],
        sans: ['"Manrope"', '"Avenir Next"', '"Helvetica Neue"', "Helvetica", "sans-serif"],
        arabic: ['"Amiri"', '"Noto Naskh Arabic"', "serif"],
      },
      boxShadow: {
        glow: "0 24px 80px rgba(182, 136, 61, 0.18)",
      },
      backgroundImage: {
        lattice:
          "radial-gradient(circle at center, rgba(182, 136, 61, 0.15) 0, rgba(182, 136, 61, 0.15) 1.6px, transparent 1.6px)",
      },
    },
  },
  plugins: [],
};
