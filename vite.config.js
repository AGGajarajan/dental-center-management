// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use dynamic base depending on environment
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/dental-center-management/' : '/',
  plugins: [react()]
})
