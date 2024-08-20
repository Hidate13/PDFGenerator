// playwright.config.js
module.exports = {
  testDir: "./tests/e2e", // The directory where your test files are located
  timeout: 30000, // Test timeout in milliseconds
  retries: 2, // Number of retries if a test fails
  use: {
    headless: true, // Run tests in headless mode
    viewport: { width: 1280, height: 720 }, // Set viewport size
  },
};
