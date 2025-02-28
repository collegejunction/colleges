import { fetchYears, fetchBranches, fetchSemesters, fetchNotes } from "@/lib/googleDrive";

const ROOT_FOLDER_ID = "1a2tDuuHNgZO0cv3edERNrLZGy-oA9FqZ"; // Your Google Drive root folder ID

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const yearId = url.searchParams.get("yearId");
    const branchId = url.searchParams.get("branchId");
    const semesterId = url.searchParams.get("semesterId");

    if (!yearId && !branchId && !semesterId) {
      // Fetch all years if no parameter is passed
      const years = await fetchYears(ROOT_FOLDER_ID);
      return Response.json({ success: true, data: { years } });
    }

    if (yearId && !branchId && !semesterId) {
      // Fetch branches inside the selected year folder
      const branches = await fetchBranches(yearId);
      return Response.json({ success: true, data: { yearId, branches } });
    }

    if (yearId && branchId && !semesterId) {
      // Fetch semesters inside the selected branch folder
      const semesters = await fetchSemesters(branchId);
      return Response.json({ success: true, data: { yearId, branchId, semesters } });
    }

    if (yearId && branchId && semesterId) {
      // Fetch notes inside the selected semester folder
      const notes = await fetchNotes(semesterId);
      return Response.json({ success: true, data: { yearId, branchId, semesterId, notes } });
    }

    return Response.json({ message: "Invalid query parameters" }, { status: 400 });

  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ success: false, message: "Error fetching data", error: error.message }, { status: 500 });
  }
}
