import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '~' : path.resolve(__dirname, './src'),
      '@' : path.resolve(__dirname, './src/Components')
    },
  },
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase'
    }
  },
  build: {
    sourcemap: true
  }
})
