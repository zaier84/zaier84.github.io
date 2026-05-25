/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          nav: 'var(--bg-nav)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          mono: 'var(--text-mono)',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          soft: 'var(--accent-soft)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Oversized editorial display scale.
        'display-sm': 'clamp(2.5rem, 7vw, 4.5rem)',
        'display': 'clamp(3rem, 9vw, 7rem)',
        'display-lg': 'clamp(3.5rem, 10vw, 7.5rem)',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.22)',
        'card-hover': '0 16px 40px -12px rgba(0, 0, 0, 0.45)',
        glow: '0 0 80px -20px var(--accent-soft)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
