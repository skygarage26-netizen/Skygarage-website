const SHEET_ID = "1rQO_s41l7fOfXufTpbFz1gPqZCjBLC7yDEG2-KbFTeU";
const SHEET_NAME = "Leads";

function doPost(e) {
  const sheet = getLeadsSheet_();
  const payload = JSON.parse(e.postData.contents || "{}");

  sheet.appendRow([
    new Date(),
    payload.formType || "",
    payload.Name || "",
    payload.Phone || "",
    payload.Vehicle || "",
    payload.Area || "",
    payload.Service || "",
    payload["Preferred date"] || "",
    payload.Notes || "",
    payload.pageUrl || "",
    payload.submittedAt || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getLeadsSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Received At",
      "Form Type",
      "Name",
      "Phone",
      "Vehicle",
      "Area",
      "Service",
      "Preferred Date",
      "Notes",
      "Page URL",
      "Submitted At",
    ]);
  }

  return sheet;
}
