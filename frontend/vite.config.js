import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/api': {
      target: 'https://solid-space-spoon-jj55649rggrpcq95r-8800.app.github.dev',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
})
