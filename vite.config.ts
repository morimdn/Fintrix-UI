import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
export default defineConfig({
  root: "apps/showcase",
  build: { outDir: "../../dist", emptyOutDir: true },
  plugins: [react()],
  test: {
    include: ["../../packages/**/*.test.tsx", "src/**/*.test.tsx"],
    environment: "jsdom",
    setupFiles: ["../../apps/showcase/src/test-setup.ts"],
    css: false,
  },
});
