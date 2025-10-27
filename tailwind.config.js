/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))',
        'glass-dark': 'linear-gradient(135deg, rgba(17,24,39,0.65), rgba(31,41,55,0.35))'
      }
    },
  },
  plugins: [],
}
