import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getAuth() {
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    return null;
  }

  return new google.auth.JWT(clientEmail, undefined, privateKey, SCOPES);
}

export async function appendLeadToSheet(email: string, plan: string) {
  const auth = getAuth();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!auth || !spreadsheetId) {
    console.warn("Google Sheets not configured — skipping lead log");
    return;
  }

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:C",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[email, new Date().toISOString(), plan]],
    },
  });
}
