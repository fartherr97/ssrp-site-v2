import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { google } from "googleapis";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

async function getSheetRows(range) {
  const auth = new google.auth.GoogleAuth({
    keyFile: "service-account.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  return response.data.values || [];
}

async function updateSheetValues(range, values) {
  const auth = new google.auth.GoogleAuth({
    keyFile: "service-account.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.SHEET_ID,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  });
}

async function clearSheetRange(range) {
  const auth = new google.auth.GoogleAuth({
    keyFile: "service-account.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.clear({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });
}

app.get("/", (req, res) => {
  res.send("Civilian Hub Express backend is running.");
});

app.get("/api/civ-roster", async (req, res) => {
  try {
    const rows = await getSheetRows("Roster!A2:H");

    const formatted = rows.map((row, index) => ({
      id: row[0] || index + 1,
      name: row[1] || "",
      discord: row[2] || "",
      tier: row[3] || "Certified Civilian",
      discipline: row[4] || "None",
      hired: row[5] || "",
      lastMove: row[6] || "",
      notes: row[7] || "",
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Roster Error:", err.message);
    res.status(500).json({ error: "Failed to load roster", details: err.message });
  }
});

app.post("/api/civ-roster/save", async (req, res) => {
  try {
    const roster = req.body || [];

    const rows = roster.map((member) => [
      member.id || Date.now(),
      member.name || "",
      member.discord || "",
      member.tier || "",
      member.discipline || "",
      member.hired || "",
      member.lastMove || "",
      member.notes || "",
    ]);

    await clearSheetRange("Roster!A2:H");

    if (rows.length) {
      await updateSheetValues("Roster!A2:H", rows);
    }

    res.json({
      success: true,
      message: "Roster saved successfully.",
    });
  } catch (err) {
    console.error("Save Roster Error:", err.message);
    res.status(500).json({
      error: "Failed to save roster",
      details: err.message,
    });
  }
});

app.get("/api/tiers", async (req, res) => {
  try {
    const rows = await getSheetRows("Tiers!A2:D");

    const formatted = rows.map((row, index) => ({
      id: row[0] || index + 1,
      name: row[1] || "",
      description: row[2] || "",
      logo: row[3] || "",
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Tiers Error:", err.message);
    res.status(500).json({ error: "Failed to load tiers", details: err.message });
  }
});

app.post("/api/tiers/save", async (req, res) => {
  try {
    const tiers = req.body || [];

    const rows = tiers.map((tier) => [
      tier.id || Date.now(),
      tier.name || "",
      tier.description || "",
      tier.logo || "",
    ]);

    await clearSheetRange("Tiers!A2:D");
    if (rows.length) await updateSheetValues("Tiers!A2:D", rows);

    res.json({ success: true, message: "Tiers saved successfully." });
  } catch (err) {
    console.error("Save Tiers Error:", err.message);
    res.status(500).json({ error: "Failed to save tiers", details: err.message });
  }
});

app.get("/api/businesses", async (req, res) => {
  try {
    const rows = await getSheetRows("Businesses!A2:F");

    const formatted = rows.map((row, index) => ({
      id: row[0] || index + 1,
      name: row[1] || "",
      type: row[2] || "",
      leader: row[3] || "",
      logo: row[4] || "",
      notes: row[5] || "",
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Businesses Error:", err.message);
    res.status(500).json({ error: "Failed to load businesses", details: err.message });
  }
});

app.post("/api/businesses/save", async (req, res) => {
  try {
    const businesses = req.body || [];

    const rows = businesses.map((biz) => [
      biz.id || Date.now(),
      biz.name || "",
      biz.type || "",
      biz.leader || "",
      biz.logo || "",
      biz.notes || "",
    ]);

    await clearSheetRange("Businesses!A2:F");
    if (rows.length) await updateSheetValues("Businesses!A2:F", rows);

    res.json({ success: true, message: "Businesses saved successfully." });
  } catch (err) {
    console.error("Save Businesses Error:", err.message);
    res.status(500).json({ error: "Failed to save businesses", details: err.message });
  }
});

app.get("/api/documents", async (req, res) => {
  try {
    const rows = await getSheetRows("Documents!A2:C");

    const formatted = rows.map((row, index) => ({
      id: row[0] || index + 1,
      title: row[1] || "",
      url: row[2] || "",
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Documents Error:", err.message);
    res.status(500).json({ error: "Failed to load documents", details: err.message });
  }
});

app.post("/api/documents/save", async (req, res) => {
  try {
    const links = req.body || [];

    const rows = links.map((link) => [
      link.id || Date.now(),
      link.title || "",
      link.url || "",
    ]);

    await clearSheetRange("Documents!A2:C");
    if (rows.length) await updateSheetValues("Documents!A2:C", rows);

    res.json({ success: true, message: "Documents saved successfully." });
  } catch (err) {
    console.error("Save Documents Error:", err.message);
    res.status(500).json({ error: "Failed to save documents", details: err.message });
  }
});

app.get("/api/settings", async (req, res) => {
  try {
    const rows = await getSheetRows("Settings!A2:B");

    const settings = {
      reminder: "",
      civilianOfMonth: "",
    };

    rows.forEach(([key, value]) => {
      if (key) settings[key] = value || "";
    });

    res.json(settings);
  } catch (err) {
    console.error("Settings Error:", err.message);
    res.status(500).json({ error: "Failed to load settings", details: err.message });
  }
});

app.post("/api/settings/save", async (req, res) => {
  try {
    const { reminder, civilianOfMonth } = req.body;

    await updateSheetValues("Settings!A1:B3", [
      ["Key", "Value"],
      ["reminder", reminder || ""],
      ["civilianOfMonth", civilianOfMonth || ""],
    ]);

    res.json({ success: true, message: "Settings saved successfully." });
  } catch (err) {
    console.error("Settings Save Error:", err.message);
    res.status(500).json({ error: "Failed to save settings", details: err.message });
  }
});

app.get("/api/rules-tables", async (req, res) => {
  try {
    const rows = await getSheetRows("RulesTables!A2:H");

    const tableMap = {};

    rows.forEach((row, index) => {
      const tableId = row[0] || `table-${index + 1}`;
      const title = row[1] || "";
      const feature = row[2] || "";

      if (!tableMap[tableId]) {
        tableMap[tableId] = {
          id: tableId,
          title,
          columns: ["Reg Civ", "Cert Civ", "Cert Civ II", "Cert Civ III", "Cert Civ IV"],
          rows: [],
        };
      }

      tableMap[tableId].rows.push({
        feature,
        access: [
          row[3] === "TRUE" || row[3] === true,
          row[4] === "TRUE" || row[4] === true,
          row[5] === "TRUE" || row[5] === true,
          row[6] === "TRUE" || row[6] === true,
          row[7] === "TRUE" || row[7] === true,
        ],
      });
    });

    res.json(Object.values(tableMap));
  } catch (err) {
    console.error("Rules Tables Error:", err.message);
    res.status(500).json({ error: "Failed to load rules tables", details: err.message });
  }
});

app.post("/api/rules-tables/save", async (req, res) => {
  try {
    const tables = req.body || [];

    const rows = [];

    tables.forEach((table) => {
      const tableRows = table.rows || [];

      tableRows.forEach((row) => {
        rows.push([
          table.id || Date.now(),
          table.title || "",
          row.feature || "",
          row.access?.[0] ? "TRUE" : "FALSE",
          row.access?.[1] ? "TRUE" : "FALSE",
          row.access?.[2] ? "TRUE" : "FALSE",
          row.access?.[3] ? "TRUE" : "FALSE",
          row.access?.[4] ? "TRUE" : "FALSE",
        ]);
      });
    });

    await clearSheetRange("RulesTables!A2:H");
    if (rows.length) await updateSheetValues("RulesTables!A2:H", rows);

    res.json({ success: true, message: "Rules tables saved successfully." });
  } catch (err) {
    console.error("Save Rules Tables Error:", err.message);
    res.status(500).json({ error: "Failed to save rules tables", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Civilian Hub running on port ${PORT}`);
});