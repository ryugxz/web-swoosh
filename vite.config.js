import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // เปิดให้เข้าถึงจากภายนอก (เช่น จากมือถือในเครือข่ายเดียวกัน)
    allowedHosts: ['.trycloudflare.com'], // อนุญาตให้เข้าถึงจากโดเมน trycloudflare.com
  },
})
