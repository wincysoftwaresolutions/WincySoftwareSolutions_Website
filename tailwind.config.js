/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF7A00',
          50: '#FFF3E8',
          100: '#FFE5CC',
          200: '#FFCC99',
          300: '#FFB266',
          400: '#FF9933',
          500: '#FF7A00',
          600: '#E66E00',
          700: '#CC5F00',
          800: '#994700',
          900: '#663000',
        },
        secondary: {
          DEFAULT: '#FFA940',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          light: '#FFF8F2',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          gray: '#666666',
        },
        accent: {
          DEFAULT: '#FFE5CC',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(26, 26, 26, 0.06)',
        softLg: '0 10px 40px rgba(255, 122, 0, 0.12)',
        glass: '0 8px 32px rgba(31, 38, 135, 0.08)',
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(135deg, #FF7A00 0%, #FFA940 100%)',
        'orange-gradient-soft': 'linear-gradient(135deg, #FFF3E8 0%, #FFE5CC 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'blob': 'blob 12s infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
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
