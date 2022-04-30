module.exports = {
  content: [
    "./public/index.html",
    './src/**/*.{vue,js}',
    './src/views/**/*.{vue,js}',
    './src/components/**/*.{vue,js}',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
