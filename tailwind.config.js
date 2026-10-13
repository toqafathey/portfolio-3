/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#171717',
        ink: '#101010',
        ivory: '#F5F1E9',
        cream: '#EAE3D8',
        champagne: '#B9A276',
        stone: '#8C8881',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        wide2: '0.18em',
        wide3: '0.28em',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        rise: 'rise 0.9s cubic-bezier(.2,.7,.2,1) both',
        float: 'float 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
