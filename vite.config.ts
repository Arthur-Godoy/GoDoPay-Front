import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const usePolling = process.env.VITE_USE_POLLING === "true";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "~": new URL("./app", import.meta.url).pathname,
    },
  },
  server: {
    host: true,
    port: 3001,
    watch: usePolling
      ? {
          usePolling: true,
          interval: 300,
        }
      : undefined,
    hmr: {
      clientPort: 3001,
    },
  },
});
