/** Tailwind config used to build tailwind.css (run: npm run build:css). */
module.exports = {
  content: [
    "./index.html",
    "./admin.html",
    "./login.html",
    "./app.js",
    "./admin.js",
    "./auth.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif", "Roboto", "Kantumruy Pro", "Dangrek"],
      },
      colors: {
        dark: {
          900: "#0a0a0a",
          800: "#141414",
          700: "#1f1f1f",
          600: "#2a2a2a",
          500: "#3a3a3a",
        },
        accent: {
          red: "#e50914",
          purple: "#8b5cf6",
          pink: "#ec4899",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scale-in": "scaleIn 0.25s ease-out",
        shake: "shake 0.4s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-8px)" },
          "40%": { transform: "translateX(8px)" },
          "60%": { transform: "translateX(-5px)" },
          "80%": { transform: "translateX(5px)" },
        },
      },
    },
  },
  plugins: [],
};
