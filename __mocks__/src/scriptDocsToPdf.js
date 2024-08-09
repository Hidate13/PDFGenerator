export function updatePieChartTitle(data) {
  var sheetId = "1sgYBjw9gueX72_VVyIyhzGIZf1o0jnSLPriIKlue6Ww"; // Google Sheets ID
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName("Pie"); // Modify 'Pie' if necessary

  var charts = sheet.getCharts();

  if (charts.length > 0) {
    var chart = charts[0];
    var newTitle =
      "Premium Breakdown for " + data["Insurer"] + " - " + data["Plan"];

    var chartBuilder = chart.modify().setOption("title", newTitle);

    sheet.updateChart(chartBuilder.build());
  } else {
    Logger.log("No charts found on the sheet.");
  }
}

export function replaceTextInSheet(data) {
  var sheetId = "1sgYBjw9gueX72_VVyIyhzGIZf1o0jnSLPriIKlue6Ww"; // Google Sheets ID
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName("Pie"); // Modify 'Pie' if necessary

  var cells = {
    B2: data["PlanPremium"], // Update PlanPremium in cell B2
    B3: data["Rider1"], // Update Rider1 in cell B3
    B4: data["Rider2"], // Update Rider2 in cell B4
  };

  for (var cell in cells) {
    sheet.getRange(cell).setValue(cells[cell]);
  }

  // Retrieve values from the cells and perform calculations
  var planPremium = parseFloat(sheet.getRange("B2").getValue()) || 0;
  var rider1Premium = parseFloat(sheet.getRange("B3").getValue()) || 0;
  var rider2Premium = parseFloat(sheet.getRange("B4").getValue()) || 0;

  var totalPremium = planPremium + rider1Premium + rider2Premium;

  // Update the pie chart title after replacing text
  updatePieChartTitle(data);

  return {
    totalPremium: totalPremium,
    ridersPremium: rider1Premium + rider2Premium,
  };
}

export function replaceTextInDocument(data, calculatedValues) {
  var templateId = "1dE7XhhbPB1dHlbuwwCpIPtHatKSfs4UC1LeE5QDOZjU"; // Google Docs template ID

  var docCopy = DriveApp.getFileById(templateId).makeCopy();
  var docId = docCopy.getId();
  Logger.log("Document copied with ID: " + docId); // Log the copied document ID
  var doc = DocumentApp.openById(docId);
  var body = doc.getBody();

  var msPremium = parseFloat(data["MSLPremium"]) || 0;
  var planPremium = parseFloat(data["PlanPremium"]) || 0;
  var additionalWithdrawalLimit =
    parseFloat(data["AdditionalWithdrawalLimit"]) || 0;
  var cashOutlay = parseFloat(data["CashOutlay"]) || 0;
  var totalCashOutlay =
    msPremium +
    planPremium +
    additionalWithdrawalLimit +
    cashOutlay +
    calculatedValues.totalPremium;

  body.replaceText("{{Name}}", data["Name"] || "");
  body.replaceText("{{Age}}", data["Age"] || "");
  body.replaceText("{{Insurer}}", data["Insurer"] || "");
  body.replaceText("{{Plan}}", data["Plan"] || "");
  body.replaceText("{{Rider}}", data["Rider"] || "");
  body.replaceText("{{MSLPremium}}", data["MSLPremium"] || "");
  body.replaceText("{{PlanPremium}}", data["PlanPremium"] || "");
  body.replaceText(
    "{{AdditionalWithdrawalLimit}}",
    data["AdditionalWithdrawalLimit"] || ""
  );
  body.replaceText("{{CashOutlay}}", data["CashOutlay"] || "");
  body.replaceText("{{RidersPremium}}", calculatedValues.ridersPremium || "");
  body.replaceText("{{TotalPremium}}", calculatedValues.totalPremium || "");
  body.replaceText("{{TotalCashOutlay}}", totalCashOutlay || "");

  doc.saveAndClose();

  var pdf = DriveApp.getFileById(docId).getAs("application/pdf");
  var name = data["Name"] || "default"; // Use the Name field for the filename
  var pdfFile = DriveApp.createFile(pdf).setName(name + ".pdf");
  Logger.log("PDF created with ID: " + pdfFile.getId()); // Log the created PDF ID

  DriveApp.getFileById(docId).setTrashed(true);

  return "https://drive.google.com/file/d/" + pdfFile.getId() + "/preview";
}

export function replaceTextAndCreatePdf(data) {
  var calculatedValues = replaceTextInSheet(data);
  var pdfUrl = replaceTextInDocument(data, calculatedValues); // This now returns the URL
  return pdfUrl;
}
export function replaceTextInDocumentAndSaveAsWord(data, calculatedValues) {
  var templateId = "1dE7XhhbPB1dHlbuwwCpIPtHatKSfs4UC1LeE5QDOZjU"; // Google Docs template ID

  // Make a copy of the Google Docs template
  var docCopy = DriveApp.getFileById(templateId).makeCopy();
  var docId = docCopy.getId();
  Logger.log("Document copied with ID: " + docId); // Log the copied document ID
  var doc = DocumentApp.openById(docId);
  var body = doc.getBody();

  // Replace placeholders with actual values
  body.replaceText("{{Name}}", data["Name"] || "");
  body.replaceText("{{Age}}", data["Age"] || "");
  body.replaceText("{{Insurer}}", data["Insurer"] || "");
  body.replaceText("{{Plan}}", data["Plan"] || "");
  body.replaceText("{{Rider}}", data["Rider"] || "");
  body.replaceText("{{MSLPremium}}", data["MSLPremium"] || "");
  body.replaceText("{{PlanPremium}}", data["PlanPremium"] || "");
  body.replaceText(
    "{{AdditionalWithdrawalLimit}}",
    data["AdditionalWithdrawalLimit"] || ""
  );
  body.replaceText("{{CashOutlay}}", data["CashOutlay"] || "");
  body.replaceText("{{RidersPremium}}", calculatedValues.ridersPremium || "");
  body.replaceText("{{TotalPremium}}", calculatedValues.totalPremium || "");
  body.replaceText(
    "{{TotalCashOutlay}}",
    calculatedValues.totalCashOutlay || ""
  );

  // Save and close the document
  doc.saveAndClose();

  // Convert the Google Docs file to DOCX format using Drive API
  var wordUrl = convertGoogleDocToWord(docId);

  Logger.log("Word document created with URL: " + wordUrl);

  // Trash the copied Google Docs template
  DriveApp.getFileById(docId).setTrashed(true);

  // Return the URL of the created Word document
  return wordUrl;
}

export function convertGoogleDocToWord(docId) {
  var url =
    "https://www.googleapis.com/drive/v3/files/" +
    docId +
    "/export?mimeType=application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  var options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + ScriptApp.getOAuthToken(),
    },
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var blob = response.getBlob();

    // Create a new file in Google Drive with the DOCX content
    var name = "Converted_Document.docx";
    var file = DriveApp.createFile(blob).setName(name);

    // Set sharing permissions
    // file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    var fileId = file.getId();
    return `https://drive.google.com/file/d/${fileId}/preview`;
  } catch (error) {
    Logger.log("Error during conversion: " + error.message);
    throw new Error("Error during conversion: " + error.message);
  }
}

export function doGet(e) {
  var data = {
    Name: "Wahyu Hidayat",
    Age: "30",
    Insurer: "Wayz Insurance",
    Plan: "Basic Plan",
    Rider: "Extra Coverage",
    MSLPremium: "100",
    PlanPremium: "200",
    AdditionalWithdrawalLimit: "50",
    CashOutlay: "150",
    Rider1: "250.98", // Update Rider1 value
    Rider2: "100.00", // Update Rider2 value
  };

  var callback =
    e && e.parameter && e.parameter.callback ? e.parameter.callback : null;

  try {
    var pdfId = replaceTextAndCreatePdf(data);
    var result = JSON.stringify({ pdfId: pdfId });

    if (callback) {
      result = callback + "(" + result + ")";
    }

    var response = ContentService.createTextOutput(result);
    response.setMimeType(ContentService.MimeType.JAVASCRIPT);

    return response;
  } catch (error) {
    Logger.log("Error: " + error.message); // Log the error message
    var result = JSON.stringify({ error: error.message });

    if (callback) {
      result = callback + "(" + result + ")";
    }

    var response = ContentService.createTextOutput(result);
    response.setMimeType(ContentService.MimeType.JAVASCRIPT);

    return response;
  }
}
