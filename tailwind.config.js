/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary, #D4AF37)',
        secondary: 'var(--color-secondary, #F5E7C1)',
        accent: 'var(--color-accent, #0B0B0F)',
        light: '#14141A',
        gold: {
          DEFAULT: 'var(--color-gold, #D4AF37)',
          soft: 'var(--color-gold-soft, #E8C765)',
          deep: 'var(--color-gold-deep, #B8902A)',
          pale: 'var(--color-gold-pale, #F0D77A)',
        },
        // Theme-driven ink tokens (flip with the active theme: dark OR light)
        ink: {
          DEFAULT: 'var(--bg, #0B0B0F)',
          soft: 'var(--surface-2, #14141A)',
          card: 'var(--surface, #1A1A22)',
          border: 'var(--line, #26262F)',
        },
        // Semantic aliases
        canvas: 'var(--bg, #0B0B0F)',
        surface: 'var(--surface, #1A1A22)',
        surface2: 'var(--surface-2, #14141A)',
        line: 'var(--line, #26262F)',
        body: 'var(--text, #EDEAE0)',
        muted: 'var(--text-muted, #A8A29A)',
        faint: 'var(--text-faint, #6E6A63)',
        'on-accent': 'var(--on-accent, #0B0B0F)',
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
        'glow': '0 0 20px rgba(212, 175, 55, 0.30)',
        'glow-lg': '0 0 48px rgba(212, 175, 55, 0.45)',
        'card-dark': '0 18px 50px -12px rgba(0, 0, 0, 0.7)',
        'gold-soft': '0 10px 40px -10px rgba(212, 175, 55, 0.35)',
      },
      backgroundImage: {
        'gold-gradient':
          'linear-gradient(135deg, var(--color-gold-deep, #B8902A) 0%, var(--color-gold, #D4AF37) 45%, var(--color-gold-pale, #F0D77A) 100%)',
        'ink-radial': 'radial-gradient(120% 120% at 50% 0%, #1A1A22 0%, #0B0B0F 60%)',
      },
    },
  },
  plugins: [],
}
