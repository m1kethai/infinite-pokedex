import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [ react() ],
  resolve:{
    alias:{
      '&' : path.resolve( __dirname, './src/assets' )
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "node_modules/bulma/sass/utilities/mixins.sass";
        `,
      }
    },
    modules: {
      localsConvention: 'camelCase'
    }
  },
  build: {
    sourcemap: true
  }
})
