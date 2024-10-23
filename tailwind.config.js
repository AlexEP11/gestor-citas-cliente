/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                ebony_black: "#171717", // Negro ébano
                deep_teal: "#ab002b", // Verde azulado profundo
                steelGray: "#DA0037", // Verde azulado claro
                ivory_sand: "#bbbbbb", // Marfil arena
                desert_tan: "#EDEDED", // Bronceado desértico
                bronze_earth: "#171717", // Tierra bronceada
            },
            fontFamily: {
                outfit: ['"Outfit"', "serif"],
            },
        },
    },
    plugins: [],
};
