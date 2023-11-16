import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    fs: {
      strict: false,
    },
  },
  build: {
    target: "es2022",
    minify: true,
    sourcemap: false,
    rollupOptions: {
      input: "src/index.ts",
    },
    outDir: "assets/scripts/mud/",
    assetsDir: ".",
  },
});