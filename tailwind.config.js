/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        primary: '#0fa3b1', // Custom color
        secondary: '#b5e2fa'
        // accent: {
        //   light: '#FAD03E',
        //   DEFAULT: '#F5A623',
        //   dark: '#F28D00',
        // },
      },

    },
  },
  plugins: [],
}
