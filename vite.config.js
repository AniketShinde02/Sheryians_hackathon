import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'rnatl-2401-4900-ac9d-92af-10a9-a28d-b2ab-16c8.a.free.pinggy.link'
    ],
  }
})
