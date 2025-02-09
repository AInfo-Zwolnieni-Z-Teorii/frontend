/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Ścieżki do plików, w których będą używane klasy Tailwind
  ],
  theme: {
    extend: {
      height: {
        'grid-template': '650px', // Replace with your desired height
        'half-screen': '50vh', // Example for half of the viewport height
      },
      width: {
        'w-20': '5rem',
        
      },
      maxWidth: {
        'max-w-375': '10px',
      },
      fontFamily: {
        'text-3.5xl':'3.05rem',
        'text-2.5xl':'2.05rem'
      },
      colors: {
        footer_bg: "#abdcff",
        main_dark_blue: "#172deb"
      }
    },
  },
  plugins: [],
};