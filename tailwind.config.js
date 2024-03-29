/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}",],
    theme: {
        screens: {
            sm: '480px',
            md: '810px',
            lg: '1191px',
            xl: '1440px',
        }
    },
    plugins: [],
}