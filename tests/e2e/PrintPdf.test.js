// e2e/PrintPdf.test.js
const { test, expect } = require("@playwright/test");

test.describe("PDF Generator Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should be able to click the Generate and Preview PDF button", async ({
    page,
  }) => {
    // Check if the button is visible
    const buttonLocator = page.locator('text="Generate and Preview PDF"');

    // Verify that the button is visible
    await expect(buttonLocator).toBeVisible();

    // Click the button
    await buttonLocator.click();
  });
});
