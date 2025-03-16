/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          light: '#60A5FA'
        },
        secondary: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399'
        },
        background: {
          DEFAULT: '#F3F4F6',
          dark: '#1F2937'
        }
      },
      fontFamily: {
        sans: ['System'],
        heading: ['System-Bold']
      }
    }
  },
  plugins: []
};
