/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                ebony_black: "#0A0908", // Negro ébano
                deep_teal: "#22333B", // Verde azulado profundo
                steelGray: "#394F58", // Verde azulado claro
                ivory_sand: "#EAE0D5", // Marfil arena
                desert_tan: "#C6AC8F", // Bronceado desértico
                bronze_earth: "#5E503F", // Tierra bronceada
            },
            fontFamily: {
                outfit: ['"Outfit"', "serif"],
            },
        },
    },
    plugins: [],
};
