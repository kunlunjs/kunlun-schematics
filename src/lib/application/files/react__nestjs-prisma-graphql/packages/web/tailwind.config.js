const defaultTheme = require('tailwindcss/defaultTheme')

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
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
  plugins: []
}
