/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './composants/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0C8892',
        secondary: '#096975',
        tertiary: '#0badba',
        quaternary: '#2D9E99',
        white: '#FEFEFF',
        black: '#000000',
        bgray: '#AAA5A4',

      },
      height: {
        '84': '21rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '170': '50rem',
        'half-screen': '50vh',
        '3/4-screen': '75vh',
      },
      width: {
        '84': '20rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
