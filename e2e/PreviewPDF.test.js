// tests/PrintPdf.playwright.test.js
import { test, expect } from "@playwright/test";

test.describe("PDF Preview Component", () => {
  test("should render correctly and handle actions", async ({ page }) => {
    // Start the Vue app
    await page.goto(
      "http://localhost:3000/preview/https%253A%252F%252Fdrive.google.com%252Ffile%252Fd%252F1nifWlE9NH4ciA5--XaJCklhtkk9jEjcJ%252Fpreview"
    ); // Adjust URL if needed

    // Check if the PDF preview iframe is present
    const iframe = page.locator("iframe");
    await expect(iframe).toBeVisible();

    // Check for the Save PDF button and click it
    const savePdfButton = page.locator("text=Save PDF");
    await expect(savePdfButton).toBeVisible();
    await savePdfButton.click();

    // Check for the Save Word button and click it
    const saveWordButton = page.locator("text=Save Word");
    await expect(saveWordButton).toBeVisible();
    await saveWordButton.click();

    // Check for the Close button and click it
    // const closeButton = page.locator("text=Close");
    // await expect(closeButton).toBeVisible();
    // await closeButton.click();

    // Verify URL redirection or other side effects
    await expect(page).toHaveURL(
      "http://localhost:3000/preview/https%253A%252F%252Fdrive.google.com%252Ffile%252Fd%252F1nifWlE9NH4ciA5--XaJCklhtkk9jEjcJ%252Fpreview"
    ); // Adjust URL if needed
  });
});
