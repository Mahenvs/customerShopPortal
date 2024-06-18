const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      fontFamily: {
        // 'sans': ['"Proxima Nova"', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        current: "var(--text-color)",
        primaryBg: '#12372A',
        primaryText:'#FBFADA',
        secondaryBg:'#ADBC9F',
        secondaryText:'#333333',
        buttonBg:'#436850',
        buttonText:'#FBFADA',
        otherColor:'#FBFADA',

        darkBg: '#1b1b2c',
        darkBlack: '#0e1528',
        darkWhite: '#f8f9f9',
        darkBorder: '#2f3a4d',
        darkBadge: '#4F192a',
        darkModal: '#1f1e2b',
        darkText:'#262d3b',
        darkButtonBg:'#f9fafb',       
      },
      textColor:{
        skin:{
          base:"var(--text-color)",
          light:"var(--text-light-color)",
          color:"var(--second-color)",
        },
      },
      backgroundColor:{
        skin:{
          fill:"var(--fill-color)",
          fillBtn:"var(--fill-color-btn)",
          indicator:"var(--fill-color-indicator)",
          light:"var(--second-color)",
        },
      },
      gradientColorStops:{
        skin:{
          hueF:"var(--fill-color-indicator)",
          hueE:"var(--white-color)"
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

