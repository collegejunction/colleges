import { google } from "googleapis";
import credentials from "@/config/collegejunction-bce6c-6501e1735aa1.json"; // Replace with your actual credentials path

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

/**
 * Fetch all years (folders inside root)
 */
export async function fetchYears(ROOT_FOLDER_ID) {
  try {
    const response = await drive.files.list({
      q: `'${ROOT_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: "files(id, name)",
    });

    return response.data.files.map(file => ({
      name: file.name,
      id: file.id,
    }));
  } catch (error) {
    console.error("Error fetching years:", error.message);
    throw new Error("Failed to fetch years from Drive");
  }
}

/**
 * Fetch branches inside a Year
 */
export async function fetchBranches(yearFolderId) {
  try {
    const response = await drive.files.list({
      q: `'${yearFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: "files(id, name)",
    });

    return response.data.files.map(file => ({
      name: file.name,
      id: file.id,
    }));
  } catch (error) {
    console.error("Error fetching branches:", error.message);
    throw new Error("Failed to fetch branches from Drive");
  }
}

/**
 * Fetch Semesters inside a Branch
 */
export async function fetchSemesters(branchFolderId) {
  try {
    const response = await drive.files.list({
      q: `'${branchFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: "files(id, name)",
    });

    return response.data.files.map(file => ({
      name: file.name,
      id: file.id,
    }));
  } catch (error) {
    console.error("Error fetching semesters:", error.message);
    throw new Error("Failed to fetch semesters from Drive");
  }
}

/**
 * Fetch Notes inside a Semester
 */
export async function fetchNotes(semesterFolderId) {
  try {
    const response = await drive.files.list({
      q: `'${semesterFolderId}' in parents and mimeType contains 'application/pdf' and trashed=false`,
      fields: "files(id, name, webViewLink)",
    });

    return response.data.files.map(file => ({
      name: file.name,
      webViewLink: file.webViewLink,
    }));
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    throw new Error("Failed to fetch notes from Drive");
  }
}
