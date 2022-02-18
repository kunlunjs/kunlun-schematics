import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  },
  server: {
    proxy: {
      '/api': 'xxx'
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    Pages({
      extensions: ['tsx'],
      dirs: 'src/pages',
      exclude: ['**/components/**.*', '**/_*/**.*'],
      importMode: 'async',
      nuxtStyle: true
    })
  ]
})
