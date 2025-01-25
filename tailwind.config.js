/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1976d2',
        'secondary': '#5cbbf6',
        'info': '#2196f3',
        'warning': '#fb8c00',
        'success': '#4caf50',
        'danger': '#dc3545',
        'dark': '#1d1d1d',
        'surface': '#15171e',
        'dimmed': 'rgba(0, 0, 0, .4)',
        'divider': 'rgba(255, 255, 255, 0.15)',
      },
      boxShadow: {
        strong: '0 4px 18px -2px #000000b3'
      }
    }
  },
  plugins: [],
}