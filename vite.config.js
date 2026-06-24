import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  publicDir: "public",
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        healthcare: "healthcare/index.html",
        realEstate: "real-estate/index.html",
      },
    },
  },
});
