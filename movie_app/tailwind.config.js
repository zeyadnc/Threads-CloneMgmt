/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure this points to your source code
    './app/**/*.{js,tsx,ts,jsx}',
    // If you use a `src` directory, add: './src/**/*.{js,tsx,ts,jsx}'
    // Do the same with `components`, `hooks`, `styles`, or any other top-level directories
  ],
  theme: {
    extend: {
      colors: {
        primary: "#030014",
        secondary: "#151312",
        light:{
        100:'#D6C6FF',
        200:'#A8B5DB',
        300:'#9CA4AB',
        },
      dark:{

        100:'#221f3d',
        200:'#0f0d23',

      },

        accent: "#AB8BFF",
      
      },
    },
  },
  plugins: [],
    presets: [require("nativewind/preset")],
};