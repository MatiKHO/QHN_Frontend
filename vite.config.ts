import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    allowedHosts: ['qhn-frontend.onrender.com', 'www.qhcn.online'],
  },
  plugins: [react(), tsconfigPaths()],
  envPrefix:'VITE_',
  
})
