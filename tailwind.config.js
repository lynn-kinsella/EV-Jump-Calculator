/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/pure_ui/*.tsx",
    "./src/components/page/*.tsx"
  ],
  safelist: [
    "text-xs",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-center"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

