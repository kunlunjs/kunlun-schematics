import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  preflight: false,
  extract: {
    // A common use case is scanning files from the root directory
    include: ['src/**/*.{html,jsx,tsx}']
  },
  plugins: [
    require('windicss/plugin/line-clamp')
    // ...
  ]
})
