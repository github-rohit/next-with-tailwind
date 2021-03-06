module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'body': ['Poppins']
      },
      colors: {
        primary: {
          DEFAULT: '#9c27b0',
        } 
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('postcss-nested'),
    require('tailwindcss/nesting'),
  ],
}
