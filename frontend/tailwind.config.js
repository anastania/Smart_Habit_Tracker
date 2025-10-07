/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#FAF9F6',
          card: '#FFFFFF',
          primary: '#D97757',
          secondary: '#88B04B',
          text: '#2E2D2B',
          textMuted: '#6B6054',
          border: '#E5E0DB',
          success: '#5C9E5C',
          warning: '#E6A23C'
        },
        dark: {
          bg: '#0D0D0F',
          card: '#1A1B1F',
          primary: '#00E5FF',
          secondary: '#FF4D6D',
          accent: '#8A2BE2',
          text: '#F5F5F5',
          textMuted: '#A1A1AA',
          border: '#2A2A2E',
          success: '#22D3EE',
          warning: '#FACC15'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        'light': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'dark': '0 0 15px rgba(0, 229, 255, 0.1)'
      }
    }
  },
  plugins: [],
}
