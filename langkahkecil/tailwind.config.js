/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          900: '#1E3A8A',
        },
        secondary: {
          coral: '#FF8B7B',
          mint: '#86EFAC',
          yellow: '#FCD34D',
          purple: '#A78BFA',
        },
        dark: {
          navy: '#0F172A',
          slate: { 700: '#334155', 800: '#1E293B', 900: '#0F172A' },
        },
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
      fontFamily: {
        sans: ['Nunito', 'Quicksand', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        xs: ['11px', '1.4'],
        sm: ['12px', '1.5'],
        base: ['14px', '1.5'],
        lg: ['16px', '1.5'],
        xl: ['20px', '1.4'],
        '2xl': ['24px', '1.3'],
        '3xl': ['28px', '1.3'],
        '4xl': ['32px', '1.2'],
      },
      animation: {
        'bounce-sm': 'bounce 0.3s ease-out',
        'pulse-soft': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-smooth': 'spin 1.2s linear infinite',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
