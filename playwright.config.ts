import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "Mobile Safari (iPhone SE)",
      use: { ...devices["iPhone SE"] },
    },
    {
      name: "Mobile Safari (iPhone 14)",
      use: { ...devices["iPhone 14"] },
    },
    {
      name: "Mobile Safari (iPhone 13 Pro)",
      use: { ...devices["iPhone 13 Pro"] },
    },
    {
      name: "Mobile Chrome (Pixel 5)",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Chrome (Pixel 7)",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "Mobile Samsung (Galaxy S9+)",
      use: { ...devices["Galaxy S9+"] },
    },
    {
      name: "Tablet (iPad Mini)",
      use: { ...devices["iPad Mini"] },
    },
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
