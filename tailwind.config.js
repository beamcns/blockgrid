/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 28px rgba(34, 211, 238, 0.28)',
        tile: 'inset 0 1px 0 rgba(255,255,255,.34), 0 10px 20px rgba(7, 15, 23, .12)',
      },
      animation: {
        'pop-in': 'popIn 180ms ease-out',
        'clear-cell': 'clearCell 420ms ease-in-out forwards',
        'float-up': 'floatUp 760ms ease-out forwards',
      },
      keyframes: {
        popIn: {
          '0%': { transform: 'scale(.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        clearCell: {
          '0%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '45%': { transform: 'scale(1.08)', filter: 'brightness(1.55)' },
          '100%': { transform: 'scale(.15)', opacity: '0' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0) scale(.8)', opacity: '0' },
          '15%': { opacity: '1' },
          '100%': { transform: 'translateY(-42px) scale(1.2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
