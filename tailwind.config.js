/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary, #D06AA0)',
        secondary: 'var(--color-secondary, #FFFFFF)',
        accent: 'var(--color-accent, #2C2C2C)',
        light: '#F5F5F5',
        gold: '#D4AF37',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        slideUp: 'slideUp 0.6s ease-out forwards',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-in',
        blob: 'blob 7s infinite',
        shimmer: 'shimmer 2s infinite',
        float: 'float 3s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(208, 106, 160, 0.3)',
        'glow-lg': '0 0 40px rgba(208, 106, 160, 0.4)',
      },
    },
  },
  plugins: [],
}
