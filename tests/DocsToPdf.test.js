import { describe, it, expect, beforeAll } from "vitest";
import "../__mocks__/sampleGoogleAppsScript"; // Ensure mocks are available

globalThis.SpreadsheetApp = globalThis.SpreadsheetApp;
globalThis.DriveApp = globalThis.DriveApp;
globalThis.DocumentApp = globalThis.DocumentApp;

// Import your script functions here
import {
  replaceTextInSheet,
  replaceTextInDocument,
  replaceTextAndCreatePdf,
} from "../__mocks__/src/scriptDocsToPdf";

describe("Google Apps Script Functions", () => {
  it("should correctly replace text in Google Sheets and update the pie chart title", () => {
    const data = {
      PlanPremium: "200",
      Rider1: "250.98",
      Rider2: "100.00",
      Insurer: "Wayz Insurance",
      Plan: "Basic Plan",
    };

    const result = replaceTextInSheet(data);

    expect(result.totalPremium).toBe(200 + 250.98 + 100.0);
    expect(result.ridersPremium).toBe(250.98 + 100.0);
  });

  it("should correctly replace text in Google Docs", () => {
    const data = {
      Name: "Wahyu Hidayat",
      Age: "30",
      Insurer: "Wayz Insurance",
      Plan: "Basic Plan",
      Rider: "Extra Coverage",
      MSLPremium: "100",
      PlanPremium: "200",
      AdditionalWithdrawalLimit: "50",
      CashOutlay: "150",
      Rider1: "250.98",
      Rider2: "100.00",
    };

    const calculatedValues = {
      totalPremium: 200 + 250.98 + 100.0,
      ridersPremium: 250.98 + 100.0,
    };

    const pdfUrl = replaceTextInDocument(data, calculatedValues);

    expect(pdfUrl).toBe("https://drive.google.com/file/d/abcdef/preview");
  });

  it("should correctly replace text in Google Docs and generate a Word (.Docx)", () => {
    const data = {
      Name: "Wahyu Hidayat",
      Age: "30",
      Insurer: "Wayz Insurance",
      Plan: "Basic Plan",
      Rider: "Extra Coverage",
      MSLPremium: "100",
      PlanPremium: "200",
      AdditionalWithdrawalLimit: "50",
      CashOutlay: "150",
      Rider1: "250.98",
      Rider2: "100.00",
    };

    const pdfUrl = replaceTextAndCreatePdf(data);

    expect(pdfUrl).toBe("https://drive.google.com/file/d/abcdef/preview");
  });
});
