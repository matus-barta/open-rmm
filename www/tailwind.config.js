/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                'accent-color': '#89bf3f',
                'accent-color-lighter': '#4ca71e',
                'accent-2-color': '#203b79',
                'accent-2-color-lighter': '#1f49a3',

                'darkest-color': '#1e1e22',
                'darker-color': '#232529',
                'dark-color': '#2b2d31',
                'dark-color-lighter': '#313338',
                'dark-color-more-lighter': '#383a40',

                'grey-color': '#95979f',
                'grey-color-lighter': '#b8bac0',
                'grey-color-more-lighter': '#f3f5f6',

                'red': '#f84f79',
                'green': '#34d15c'
            }
        }
    },
    plugins: []
};