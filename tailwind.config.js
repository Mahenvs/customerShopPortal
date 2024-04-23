/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        current: "var(--text-color)",
        primaryBg: '#12372A',
        primaryText:'#FBFADA',
        secondaryBg:'#ADBC9F',
        secondaryText:'#333333',
        buttonBg:'#436850',
        buttonText:'#FBFADA',
        otherColor:'#FBFADA',

        darkBlack: '#09090B',
        darkBg: '#030712',
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
          light:"var(--text-light-color)"
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
          hueE:"var(--fill-color)",
          hueF:"var(--white-color)"
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

