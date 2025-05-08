import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "./src/core"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
