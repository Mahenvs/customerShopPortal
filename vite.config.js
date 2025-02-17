import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // Here
    strictPort: true,
    port: 5174,
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Removes console logs
      },
      format: {
        comments: false, // Removes comments
      },
    },
  },
});
