import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/nasa': {
        target: 'https://api.nasa.gov',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/nasa/, ''),
      },
      '/api/tech': {
        target: 'https://technology.nasa.gov/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tech/, ''),
      },
    },
  },
});
