import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    // Configurações para Gitpod
    hmr: {
      clientPort: 443
    },
    host: true,
    allowedHosts: ['.gitpod.io']
  }
})
