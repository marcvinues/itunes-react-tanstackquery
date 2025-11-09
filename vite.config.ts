import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  esbuild: false,
  server: {
    allowedHosts: true,
    port: 5173,
    open: true,
     proxy: {
      '/api': {
        target: 'https://itunes.apple.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
  alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  // Build options
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'index.html') // Entry point for the app
      }
    }
  }
});
