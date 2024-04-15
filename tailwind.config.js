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
        primaryBg: '#12372A',
        primaryText:'#FBFADA',
        secondaryBg:'#ADBC9F',
        secondaryText:'#333333',
        buttonBg:'#436850',
        buttonText:'#FBFADA',
        otherColor:'#FBFADA',

        darkBlack: '#020917',
        darkLightBlack: '#2f192a',
        darkGray: '#000111',
        darkWhite: '#f8f9f9',
        darkBorder: '#F5C3C6',
        darkBadge: '#4F192a',
        darkModal: '#2F182F'
        // darkBorder: '#C5C3C6'
        // white: '#fff',
        
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

