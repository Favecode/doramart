/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C97A',
          dark: '#9A7A2E',
          champagne: '#F5E6C8',
        },
        night: {
          DEFAULT: '#0A0806',
          100: '#1A1510',
          200: '#241E15',
          300: '#2E2618',
          400: '#3D3220',
        },
        brown: {
          DEFAULT: '#4A3728',
          light: '#6B5240',
          dark: '#2D1F14',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease forwards',
        'fade-up': 'fadeUp 1s ease forwards',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.6 } },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0A0806 0%, #1A1510 50%, #0A0806 100%)',
      }
    },
  },
  plugins: [],
}
