/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'hight-light': '#06b6d4'
            },
            dropShadow: {
                md: '0 10px 10px rgb(183, 195, 226)'
            }
        }
    },
    plugins: []
};
