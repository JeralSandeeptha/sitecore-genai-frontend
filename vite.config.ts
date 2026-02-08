import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // 👈 makes Vite listen on 0.0.0.0 (not just localhost)
    port: 5173, // optional, just to keep it consistent
    strictPort: true, // optional, ensures Vite fails if port is taken
  },
})
