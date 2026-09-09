/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F2E8',
        ink: '#20242B',
        teal: {
          DEFAULT: '#2F5D50',
          dark: '#20402F',
          light: '#4A7B6C',
        },
        gold: {
          DEFAULT: '#E3A857',
          dark: '#C98A38',
          light: '#F0C888',
        },
        clay: '#B0472E',
        line: '#DCD5C4',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Work Sans"', 'sans-serif'],
      },
      borderRadius: {
        card: '10px',
      },
    },
  },
  plugins: [],
}
