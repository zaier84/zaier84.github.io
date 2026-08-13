/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ground: 'var(--ground)',
        raised: 'var(--raised)',
        bone: {
          DEFAULT: 'var(--bone)',
          dim: 'var(--bone-dim)',
        },
        rule: {
          DEFAULT: 'var(--rule)',
          strong: 'var(--rule-strong)',
        },
        oxide: {
          DEFAULT: 'var(--oxide)',
          on: 'var(--on-oxide)',
        },
      },
      fontFamily: {
        sans: ['Instrument Sans', 'system-ui', 'sans-serif'],
        data: ['Spline Sans Mono', 'ui-monospace', 'monospace'],
        display: ['Archivo', 'Instrument Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // The thesis runs to the width of its measure, so it is set in vw
        // with hard bounds rather than at fixed steps.
        thesis: ['clamp(2.5rem, 7.2vw, 6.5rem)', { lineHeight: '0.94' }],
        build: ['clamp(1.9rem, 4vw, 3.25rem)', { lineHeight: '1' }],
        readout: ['clamp(1.85rem, 3.4vw, 3rem)', { lineHeight: '1' }],
      },
      maxWidth: {
        plate: '78rem',
        measure: '34rem',
      },
    },
  },
  plugins: [],
};
