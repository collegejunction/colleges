import { google } from "googleapis";
import path from "path";
import { readFileSync } from "fs";

export default async function handler(req, res) {
  try {
    // Load Google Service Account credentials
    const keyFilePath = path.join(process.cwd(), "config", "collegejunction-bce6c-6501e1735aa1.json");
    const credentials = JSON.parse(readFileSync(keyFilePath, "utf8"));

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });

    // Change this with your Drive's main folder ID
    const rootFolderId = "1a2tDuuHNgZO0cv3edERNrLZGy-oA9FqZ";

    // Fetch first-level folders (Years)
    const { data: { files: years } } = await drive.files.list({
      q: `'${rootFolderId}' in parents and mimeType='application/vnd.google-apps.folder'`,
      fields: "files(id, name)",
    });

    const result = [];

    for (const year of years) {
      // Fetch branches inside each year folder
      const { data: { files: branches } } = await drive.files.list({
        q: `'${year.id}' in parents and mimeType='application/vnd.google-apps.folder'`,
        fields: "files(id, name)",
      });

      const branchData = [];

      for (const branch of branches) {
        // Fetch semesters inside each branch
        const { data: { files: semesters } } = await drive.files.list({
          q: `'${branch.id}' in parents and mimeType='application/vnd.google-apps.folder'`,
          fields: "files(id, name)",
        });

        const semesterData = [];

        for (const semester of semesters) {
          // Fetch PDFs inside each semester
          const { data: { files: notes } } = await drive.files.list({
            q: `'${semester.id}' in parents and mimeType='application/pdf'`,
            fields: "files(id, name, webViewLink)",
          });

          semesterData.push({
            name: semester.name,
            notes,
          });
        }

        branchData.push({
          name: branch.name,
          semesters: semesterData,
        });
      }

      result.push({
        name: year.name,
        branches: branchData,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
}
