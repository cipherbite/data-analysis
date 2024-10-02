const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        secondary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        dark: '#1a2e05',
        light: '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(20, 83, 45, 0.1), 0 10px 20px -2px rgba(20, 83, 45, 0.04)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.dark'),
            a: {
              color: theme('colors.secondary.400'),
              '&:hover': {
                color: theme('colors.secondary.300'),
              },
            },
            code: {
              fontFamily: theme('fontFamily.mono'),
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.primary.700'),
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.light'),
            a: {
              color: theme('colors.secondary.500'),
              '&:hover': {
                color: theme('colors.secondary.300'),
              },
            },
            code: {
              color: theme('colors.primary.300'),
              backgroundColor: theme('colors.gray.700'),
            },
          },
        },
      }),
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(function({ addUtilities, theme }) {
      const newUtilities = {
        '.bg-gradient-primary': {
          background: `linear-gradient(to right, ${theme('colors.primary.700')}, ${theme('colors.primary.900')})`,
        },
        '.bg-gradient-secondary': {
          background: `linear-gradient(to right, ${theme('colors.secondary.600')}, ${theme('colors.secondary.800')})`,
        },
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        },
        '.transition-bg': {
          transition: 'background-color 0.3s ease',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
  darkMode: 'class',
}