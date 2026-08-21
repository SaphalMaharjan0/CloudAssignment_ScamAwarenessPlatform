import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Output the React build directly into the Spring Boot static folder
    outDir: '../CloudBackend/src/main/resources/static',
    emptyOutDir: true
  }
})
