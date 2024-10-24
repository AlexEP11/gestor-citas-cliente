/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                ebony_black: "#171717",
                deep_crimson: "#AB002B",
                scarlet_red: "#DA0037",
                silver_fog: "#bbbbbb",
                light_sand_gray: "#EDEDED",
                dark_earth: "#171717",
            },
            fontFamily: {
                outfit: ['"Outfit"', "serif"],
            },
        },
    },
    plugins: [],
};
