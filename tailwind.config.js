/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060D1A',
          900: '#0F172A',
          850: '#152238',
          800: '#1E293B',
          700: '#334155',
        },
        steel: {
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
        },
        flame: {
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
        gold: {
          500: '#F59E0B',
          600: '#D97706',
        }
      },
      fontFamily: {
        heading: ['Manrope', 'Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
