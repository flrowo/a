/** @type {import('tailwindcss').Config} */

export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            imageRendering: {
                pixelated: 'pixelated',
            },
            keyframes: {
                rainbow: {
                    '0%': { color: '#ff0000' },
                    '16%': { color: '#ff9900' },
                    '33%': { color: '#ffff00' },
                    '50%': { color: '#00ff00' },
                    '66%': { color: '#0000ff' },
                    '83%': { color: '#4b0082' },
                    '100%': { color: '#ff0000' },
                },
            },
            animation: {
                rainbow: 'rainbow 300s linear infinite',
            },
        },
    },
    plugins: [],
};