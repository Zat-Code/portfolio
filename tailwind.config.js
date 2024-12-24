/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'shine-silver': 'shine 2s linear infinite',
        'bounce-1': 'bounce1 3s infinite',
        'bounce-2': 'bounce2 4s infinite',
        'bounce-3': 'bounce3 3.5s infinite',
        'bounce-4': 'bounce4 4.5s infinite',
        'bounce-5': 'bounce5 5s infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'energy-core': 'energyCore 2s ease-in-out infinite',
        'electric-1': 'electric1 3s linear infinite',
        'electric-2': 'electric2 2.5s linear infinite',
        'fade-slide-up': 'fade-slide-up 0.5s ease-out forwards'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        bounce1: {
          '0%, 100%': { transform: 'translateY(-10%)' },
          '50%': { transform: 'translateY(0)' },
        },
        bounce2: {
          '0%, 100%': { transform: 'translateY(-15%)' },
          '50%': { transform: 'translateY(5%)' },
        },
        bounce3: {
          '0%, 100%': { transform: 'translateY(-12%)' },
          '50%': { transform: 'translateY(3%)' },
        },
        bounce4: {
          '0%, 100%': { transform: 'translateY(-18%)' },
          '50%': { transform: 'translateY(7%)' },
        },
        bounce5: {
          '0%, 100%': { transform: 'translateY(-20%)' },
          '50%': { transform: 'translateY(10%)' },
        },
        energyCore: {
          '0%, 100%': { 
            transform: 'scale(1)',
            opacity: '0.2'
          },
          '50%': { 
            transform: 'scale(1.5)',
            opacity: '0.4'
          }
        },
        electric1: {
          '0%': { 
            transform: 'rotate(0deg)',
            opacity: '0.4'
          },
          '50%': {
            opacity: '0.7'
          },
          '100%': { 
            transform: 'rotate(360deg)',
            opacity: '0.4'
          }
        },
        electric2: {
          '0%': { 
            transform: 'rotate(0deg)',
            opacity: '0.4'
          },
          '50%': {
            opacity: '0.7'
          },
          '100%': { 
            transform: 'rotate(-360deg)',
            opacity: '0.4'
          }
        },
        'fade-slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
    },
  },
  plugins: [],
} 