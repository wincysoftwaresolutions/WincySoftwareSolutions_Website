/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D61F7F',
          50: '#FDF0F6',
          100: '#FBDCEB',
          200: '#F7B8D6',
          300: '#F08FBE',
          400: '#E65AA0',
          500: '#D61F7F',
          600: '#B8176C',
          700: '#961258',
          800: '#6E0D41',
          900: '#480829',
        },
        secondary: {
          DEFAULT: '#FFA940',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          light: '#FFF8F2',
        },
        ink: {
          DEFAULT: '#121212',
          gray: '#3F3F46',
        },
        accent: {
          DEFAULT: '#FFE5CC',
        },
      },
      fontFamily: {
        heading: ['Hanken Grotesk', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(26, 26, 26, 0.06)',
        softLg: '0 10px 40px rgba(214, 31, 127, 0.12)',
        glass: '0 8px 32px rgba(31, 38, 135, 0.08)',
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(135deg, #D61F7F 0%, #E8891A 100%)',
        'orange-gradient-soft': 'linear-gradient(135deg, #FDEEF5 0%, #FFE8CF 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-up': 'float-up 6s ease-in-out infinite',
        'float-down': 'float-down 7s ease-in-out infinite',
        'blob': 'blob 12s infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'float-up': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -8px, 0)' },
        },
        'float-down': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, 8px, 0)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}