/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '5xl': '2px 4px 5px rgba(0, 0, 0, 225)',
        'glow': '0 0 20px rgba(79, 70, 229, 0.7)', // Example for glowing effect
      },
    },
  },
  plugins: [],
}

