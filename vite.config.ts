import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // الـ base مهم جداً عشان الـ Extension يقرأ الملفات صح من الـ dist
  base: "./", 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // لضمان إن الملفات تطلع بأسماء واضحة وما يحصلش مشاكل في الـ hashing مع كروم
    outDir: "dist",
    emptyOutDir: true,
  }
})