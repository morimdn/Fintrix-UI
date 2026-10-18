import { existsSync } from "node:fs";
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/pages",
  outputDir: "pages-test-results",
  use: {
    baseURL: "http://127.0.0.1:4173/Techosoul-UI/",
    launchOptions: {
      executablePath:
        process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
        (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    },
  },
  webServer: {
    // Test the deployed artifact, including lazy chunks, rather than Vite dev.
    command:
      "npx vite preview --host 127.0.0.1 --port 4173 --strictPort --base=/Techosoul-UI/",
    url: "http://127.0.0.1:4173/Techosoul-UI/",
    reuseExistingServer: false,
  },
  reporter: "list",
});
