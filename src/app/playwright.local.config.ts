import { defineConfig } from "@playwright/test";

import baseConfig from "./playwright.config";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config = defineConfig({
  ...baseConfig,
  workers: 2,
  use: {
    baseURL: "http://localhost:3000",
  },
});

export default config;
