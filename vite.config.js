// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use dynamic base depending on environment
export default defineConfig({
 base: '/dental-center-management/',
  plugins: [react()]
})
