/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      height: {
        'p-card': '380px',
        '50v': '50vh',
        '60v': '60vh',
        '80v': '80vh',
        '90v': '90vh',
        '100v-h': 'calc(100vh - 80px)',
      },
      minHeight: {
        '100v-h': 'calc(100vh - 90px)',
        '100v-h2': 'calc(100vh - 100px)',
      },
      flex: {
        '0-auto': '0 0 auto',
      },
      colors: {
        'blue-one': '#54BCCA',
        'blue-two': '#73C2D1',
        'orange-one': '#FF8200',
        'pink-one': '#E52E73',
        'bg-one': '#FEF2E8',
      },
      fontFamily: {
        modelicabold: ['modelica-bold', 'sans-serif'],
        modelicalight: ['modelica-light', 'sans-serif'],
        modelicamed: ['modelica-medium', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
