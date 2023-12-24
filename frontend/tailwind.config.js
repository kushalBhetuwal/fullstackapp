/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          500:'#ff7000',
          100:'#fff1e6',
        },
        light:{
          900:'#fff',
          800:'#f4f6f8',
          850:"#fdfdfd",
          700:"#dce3f1",
          500:"#7b8ec8",
          400:"#858ead"
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

