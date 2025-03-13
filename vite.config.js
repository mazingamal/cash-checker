import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'
dotenv.config()
// https://vite.dev/config/
export default defineConfig({
  server:{
    port: process.env.VITE_PORT || 3000
  },
  plugins: [react(),
    
    tailwindcss(),
  ],
})
