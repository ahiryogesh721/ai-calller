import { google } from 'googleapis';
import service_json from '../../service_auth.json' 

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SERVICE_ACCOUNT_JSON = service_json;

const auth = new google.auth.GoogleAuth({
  credentials: SERVICE_ACCOUNT_JSON,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

type LeadRow = {
  rowIndex: number;
  phone: string;
  status: string;
};

export async function getNewLeads(): Promise<LeadRow[]> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'Sheet1!A2:C', // A=phone, B=status, C=unused for now
  });

  const rows = res.data.values || [];
  const leads: LeadRow[] = [];

  rows.forEach((row, index) => {
    const phone = row[0];
    const status = row[1] || '';

    if (!phone) return;
    if (status.toLowerCase() === 'called') return;

    leads.push({
      rowIndex: index + 2, // sheet row number
      phone,
      status,
    });
  });

  return leads;
}
