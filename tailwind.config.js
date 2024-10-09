/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                lightest_gray: "#F0F5F9",
                light_gray: "#C9D6DF",
                dark_gray: "#52616B",
                purple: "#D0BCFF",
                charcoal: "#1E2022",
            },
            fontFamily: {
                outfit: ['"Outfit"', "serif"],
            },
        },
    },
    plugins: [],
};
