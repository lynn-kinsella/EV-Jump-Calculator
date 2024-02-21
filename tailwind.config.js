/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/ui/*.tsx",
    "./src/pages/**/*.tsx",
    "./src/components/*.tsx",
  ],
  safelist: [
    "text-xs",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-center",
    "bg-red-200",
    "bg-blue-200",
    "from-blue-100",
    "to-red-100",
    "from-red-100",
    "to-blue-100",
    "bg-gradient-to-r"
  ],
  theme: {
    colors: {
      yellow: { "100": "#F9F6DA", "400": "#FCFF64" },
      red: { "400": "#F67B7B", "800": "#6A189C", "100": "#F7D1D1" },
      blue: { "100": "#D1EEF7", "400": "#60a5fa", "700": "#1d4ed8" },
      green: { "400": "#7DE8A8" },
      gray: { "400": "#B6B6B6" },
      pink: { "200": "#f5d0fe", "400": "#e879f9" },
      white: "white",
      black: "black"
    },
    extend: {},
  },
  plugins: [],
}

