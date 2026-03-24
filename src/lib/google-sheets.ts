import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getAuth() {
  // Handle both formats: literal \n (from .env) and real newlines (from Vercel)
  let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  if (privateKey && !privateKey.includes("\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    return null;
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });
}

export async function appendLeadToSheet(email: string, plan: string) {
  const auth = getAuth();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!auth || !spreadsheetId) {
    console.warn(
      "Google Sheets not configured — skipping lead log",
      JSON.stringify({
        hasEmail: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        hasKey: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
        hasSheet: !!spreadsheetId,
      })
    );
    return;
  }

  console.log("Appending lead to Google Sheets:", email, plan);

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:C",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[email, new Date().toISOString(), plan]],
    },
  });

  console.log("Lead appended successfully");
}
