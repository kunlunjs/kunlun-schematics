import { defineConfig } from '../../../../../../kunlun-cli/lib/index'

// @ts-check
export default defineConfig({
  start: {
    loaders: {
      less: {
        modifyVars: {},
        globalVars: {}
      }
    },
    devServer: {
      proxy: {
        '/api': {
          target: process.env.PROXY_URL || 'http://localhost:3000'
        }
      }
    }
  },
  build: {
    entry: 'src/main.tsx'
  }
})
