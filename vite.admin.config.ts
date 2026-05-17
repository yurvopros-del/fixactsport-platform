import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/",

  build: {
    outDir: "dist-admin",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "admin.html"),
    },
  },

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});