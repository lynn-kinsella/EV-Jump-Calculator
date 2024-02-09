import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "tailwindcss"

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  build: {
    rollupOptions: {
      output: {}
    }
  },
  plugins: [react(),
  splitVendorChunkPlugin()],
})
