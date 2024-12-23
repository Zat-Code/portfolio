/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'shine-silver': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'shine-silver-delayed': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'shine-silver-bright': {
          '0%': { transform: 'translateX(-100%)' },
          '25%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'border-flow': {
          '0%, 100%': { 
            'background-position': '0% 50%',
            transform: 'rotate(0deg)'
          },
          '50%': { 
            'background-position': '100% 50%',
            transform: 'rotate(360deg)'
          }
        }
      },
      animation: {
        'shine-silver': 'shine-silver 3s linear infinite',
        'shine-silver-delayed': 'shine-silver-delayed 3s linear infinite',
        'shine-silver-bright': 'shine-silver-bright 3s linear infinite',
        'border-flow': 'border-flow 8s ease infinite'
      },
      backgroundSize: {
        '400%': '400% 400%'
      }
    },
  },
  plugins: [],
} 