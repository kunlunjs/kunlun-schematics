const defaultTheme = require('tailwindcss/defaultTheme')

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  mode: 'jit',
  content: [
    './packages/web/src/**/*.{js,jsx,ts,tsx}',
    './packages/web/public/index.html'
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
}
