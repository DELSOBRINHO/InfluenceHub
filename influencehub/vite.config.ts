import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Permitir todos os hosts do Gitpod
    hmr: {
      clientPort: 443
    },
    host: true,
    allowedHosts: [
      // Permitir o host específico
      ' 5173-delsobrinho-influencehu-acb3knhy4yp.ws-us118.gitpod.io',
      // Permitir todos os hosts do Gitpod (padrão mais genérico)
      '.gitpod.io'
    ]
  }
})
