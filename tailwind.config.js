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
        tertiary: '#26B6B5',
        white: '#FEFEFF',
        black: '#000000',
        bgray: '#AAA5A4',

      },
      height: {
        '74': '18rem',
        '80': '20rem',
        '84': '21rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '170': '50rem',
        'half-screen': '50vh',
        '3/4-screen': '75vh',
      },
      width: {
        '64': '18rem',
        '74': '19rem',
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
      spacing: {
        '21': '5.20rem',
        '22': '5.5rem',
        '23': '5.60rem',
        '24': '5.80rem',
        '25': '6rem',
        '26': '6.20rem',
        '27': '6.40rem',
        '28': '7rem',
      },
    },
  },
  plugins: [],
}
