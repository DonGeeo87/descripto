import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/descripto/', // Necesario para GitHub Pages
  plugins: [react()],
})
