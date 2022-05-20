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
        sans: ['Poppins', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
