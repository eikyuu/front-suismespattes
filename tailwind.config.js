/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        bgray : {
          DEFAULT: "hsl(var(--bgray))",
          foreground: "hsl(var(--bgray-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      height: {
        '74': '18rem',
        '80': '20rem',
        '84': '21rem',
        '100': '26rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '166': '45rem',
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
        'map': 'linear-gradient( rgba(255, 255, 255, 0.93), rgba(255, 255, 255, 0.93)), url("../public/images/map.webp")',
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
  plugins: [require("tailwindcss-animate")],
}