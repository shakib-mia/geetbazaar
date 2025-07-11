import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import inject from "@rollup/plugin-inject";

export default defineConfig({
  plugins: [
    react(),
    inject({
      $: "jquery",
      jQuery: "jquery",
      // Add this to only apply to JS files:
      include: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
      // optionally exclude style files:
      exclude: ["**/*.scss", "**/*.css"],
    }),
  ],
  optimizeDeps: {
    include: ["react-owl-carousel"],
  },
});
