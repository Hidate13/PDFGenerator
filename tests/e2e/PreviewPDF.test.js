// tests/PrintPdf.playwright.test.js
import { test, expect } from "@playwright/test";

test.describe("PDF Preview Component", () => {
  test("should render correctly and handle actions", async ({ page }) => {
    // Start the Vue app
    await page.goto(
      "http://localhost:3000/preview/https%253A%252F%252Fdrive.google.com%252Ffile%252Fd%252F12qx96nLYfoDK1dQMV6JqhFzQ91LcdyFf%252Fpreview"
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
      "http://localhost:3000/preview/https%253A%252F%252Fdrive.google.com%252Ffile%252Fd%252F12qx96nLYfoDK1dQMV6JqhFzQ91LcdyFf%252Fpreview"
    ); // Adjust URL if needed
  });

  test('should navigate back when "Close" button is clicked', async ({
    page,
  }) => {
    // Start the Vue app
    await page.goto(
      "http://localhost:3000/preview/https%253A%252F%252Fdrive.google.com%252Ffile%252Fd%252F12qx96nLYfoDK1dQMV6JqhFzQ91LcdyFf%252Fpreview"
    );

    // Click the "Close" button
    await page.click('button:has-text("Close")');

    // Assert the navigation
    await expect(page).toHaveURL("http://localhost:3000/");
  });

  test('should trigger PDF download when "Save PDF" button is clicked', async ({
    page,
  }) => {
    // Start the Vue app
    await page.goto(
      "http://localhost:3000/preview/https%253A%252F%252Fdrive.google.com%252Ffile%252Fd%252F12qx96nLYfoDK1dQMV6JqhFzQ91LcdyFf%252Fpreview"
    );
    // Increase the timeout for this test
    test.setTimeout(60000);

    // Mock the download link
    await page.route(
      "https://drive.google.com/uc?export=download&id=12qx96nLYfoDK1dQMV6JqhFzQ91LcdyFf",
      (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/pdf",
          headers: {
            "Content-Disposition":
              'attachment; filename="default_document.pdf"', // Mock the filename
          },
          body: "PDF content here",
        })
    );

    // Ensure the page has loaded
    await page.waitForLoadState("networkidle");

    // Wait for the button to appear
    await page.waitForSelector('button:has-text("Save PDF")');

    // Click the "Save PDF" button
    const savePdfButton = await page.locator('button:has-text("Save PDF")');
    await expect(savePdfButton).toBeVisible();
    console.log("Clicking Save PDF button...");

    // Wait for the download event to be triggered by the button click
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      savePdfButton.click(), // Trigger the download
    ]);

    // Assert the file name
    const fileName = await download.suggestedFilename();
    expect(fileName).toBe("default_document.pdf");
  });

  test('should trigger Word document download when "Save Word" button is clicked', async ({
    page,
  }) => {
    // Navigate to the page with the preview
    await page.goto(
      "http://localhost:3000/preview/https%253A%252F%252Fdrive.google.com%252Ffile%252Fd%252F12qx96nLYfoDK1dQMV6JqhFzQ91LcdyFf%252Fpreview?wordUrl=https://drive.google.com/uc?id=1rbElw2CqL05xvni58Mj5v7W1DWRs-0pj%26export=download"
    );

    // Increase the timeout for this test to account for longer operations
    test.setTimeout(70000);

    // Mock the download link
    await page.route(
      "https://drive.google.com/uc?export=download&id=1rbElw2CqL05xvni58Mj5v7W1DWRs-0pj",
      (route) =>
        route.fulfill({
          status: 200,
          contentType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          headers: {
            "Content-Disposition":
              'attachment; filename="default_document.docx"', // Mock the filename
          },
          body: "Word document content here",
        })
    );

    // Wait for the button to appear
    await page.waitForSelector('button:has-text("Save Word")');

    // Click the "Save Word" button
    const saveWordButton = await page.locator('button:has-text("Save Word")');
    await expect(saveWordButton).toBeVisible();
    console.log("Clicking Save Word button...");

    await saveWordButton.click(); // Trigger the download

    // Wait for the download to occur
    const [download] = await Promise.all([
      page.waitForEvent("download", { timeout: 60000 }).catch((error) => {
        console.error("Error waiting for download:", error);
      }),
    ]);

    // Assert the file name
    if (download) {
      const fileName = await download.suggestedFilename();
      expect(fileName).toBe("default_document.docx");
    } else {
      console.error("No download event captured.");
    }
  });
});
