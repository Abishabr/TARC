import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1F6F3A',
        secondary: '#7A4A2D',
        accent: '#D8A63A',
        success: '#2E8B57',
        warning: '#D08A00',
        danger: '#B42318',
        info: '#2563EB',
        white: '#FFFFFF',
        black: '#111612',
        neutral: {
          50: '#F8FAF7',
          100: '#F1F5F0',
          200: '#E2E8E1',
          300: '#CBD5CC',
          400: '#94A295',
          500: '#647168',
          600: '#47524A',
          700: '#344037',
          800: '#202722',
          900: '#111612',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
        display: ['Poppins', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 8px 24px rgba(17, 22, 18, 0.08)',
        elevated: '0 20px 60px rgba(17, 22, 18, 0.12)',
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        round: '9999px',
      },
      spacing: {
        '2xs': '0.25rem',
        '3xl': '3rem',
        '4xl': '4rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
      transitionTimingFunction: {
        standard: 'ease-in-out',
      },
      transitionDuration: {
        fast: '120ms',
        standard: '200ms',
        slow: '300ms',
      },
    },
  },
  plugins: [],
} satisfies Config
