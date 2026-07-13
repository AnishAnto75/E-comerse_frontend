/** @type {import('tailwindcss').Config} */

module.exports = ({
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
                roboto: ['roboto', 'sans-serif'],
                manrope: ["Manrope", "sans-serif"],
                geist: ["Geist", "sans-serif"],
              },
        },
    },
    plugins: [
    ],
})
