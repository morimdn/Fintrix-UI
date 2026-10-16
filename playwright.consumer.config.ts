import { readFileSync } from "node:fs";
import { defineConfig } from "@playwright/test";
import base from "./playwright.config";
export default defineConfig({
  testDir: "./tests/consumer",
  outputDir: "./consumer-test-results",
  use: { ...base.use, baseURL: "http://127.0.0.1:5174" },
  webServer: {
    command: "npm run preview -- --port 5174",
    cwd: readFileSync(".consumer-path", "utf8").trim(),
    url: "http://127.0.0.1:5174",
    reuseExistingServer: false,
  },
});
