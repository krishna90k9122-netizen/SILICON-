/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF4D0A',
          'orange-hover': '#E64205',
          'orange-light': '#FFF0EB',
          navy: '#102438',
          'navy-dark': '#0B1724',
          'navy-light': '#1A3654',
          bg: '#F5F7FA',
          card: '#FFFFFF',
          green: '#16A36A',
          'green-light': '#E8F7F0',
          amber: '#F5A623',
          'amber-light': '#FEF6E9',
          red: '#E5484D',
          'red-light': '#FEECEE',
          blue: '#2563EB',
          'blue-light': '#EFF6FF',
          muted: '#6B7280',
          border: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(16, 36, 56, 0.04), 0 1px 3px rgba(16, 36, 56, 0.02)',
        'card': '0 4px 20px -2px rgba(16, 36, 56, 0.06), 0 2px 6px -1px rgba(16, 36, 56, 0.03)',
        'modal': '0 20px 40px -15px rgba(16, 36, 56, 0.25)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
