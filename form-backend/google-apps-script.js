const SHEET_ID = "1ljfQBp5D3oxdL5pqnThitL811XlCgnzPCsl_hD0Va6o";
const SHEET_NAME = "Submissions";
const EMAIL_TO = "matei@psatta.com";

const HEADERS = [
  "submittedAt",
  "type",
  "name",
  "email",
  "currentRole",
  "company",
  "linkedin",
  "answer",
  "source",
];

function doPost(event) {
  const payload = parsePayload_(event);
  const row = normalizeSubmission_(payload);
  const sheet = getSubmissionSheet_();

  ensureHeaders_(sheet);
  sheet.appendRow(HEADERS.map((header) => row[header] || ""));
  sendNotification_(row);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function parsePayload_(event) {
  if (!event || !event.postData || !event.postData.contents) {
    throw new Error("Missing request body.");
  }

  return JSON.parse(event.postData.contents);
}

function normalizeSubmission_(payload) {
  const isFounder = payload.type === "Company";

  return {
    submittedAt: payload.submittedAt || new Date().toISOString(),
    type: payload.type || "",
    name: isFounder ? payload["founder-name"] : payload["growth-name"],
    email: isFounder ? payload["founder-email"] : payload["growth-email"],
    currentRole: isFounder ? payload["founder-role"] : payload["growth-role"],
    company: isFounder ? payload["founder-company"] : payload["growth-company"],
    linkedin: isFounder ? payload["founder-linkedin"] : payload["growth-linkedin"],
    answer: isFounder ? payload["founder-a-players"] : payload["growth-spectacular"],
    source: payload.source || "https://psatta.com/",
  };
}

function getSubmissionSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaders_(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = HEADERS.every((header, index) => firstRow[index] === header);

  if (!hasHeaders) {
    sheet.clear();
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function sendNotification_(row) {
  const subject = `New psatta.com form submission: ${row.type || "Unknown"}`;
  const body = [
    `Type: ${row.type}`,
    `Name: ${row.name}`,
    `Email: ${row.email}`,
    `Current role: ${row.currentRole}`,
    `Company: ${row.company}`,
    `LinkedIn: ${row.linkedin}`,
    "",
    "Answer:",
    row.answer,
    "",
    `Source: ${row.source}`,
    `Submitted: ${row.submittedAt}`,
  ].join("\n");

  MailApp.sendEmail(EMAIL_TO, subject, body, {
    replyTo: row.email || EMAIL_TO,
    name: "psatta.com",
  });
}
