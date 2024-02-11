/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        // transparent: 'transparent',
        darkBlack: '#020917',
        darkLightBlack: '#2f192a',
        darkGray: '#000111',
        darkWhite: '#f8f9f9',
        darkBorder: '#F5C3C6',
        darkBadge: '#4F192a'
        // darkBorder: '#C5C3C6'
        // white: '#fff',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

