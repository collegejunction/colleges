import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import College from "@/models/College";

export async function GET(req) {
  try {
    // Ensure DB connection
    await connectToDatabase();

    // Extract query parameters safely
    const { searchParams } = new URL(req.url);
    const percentage = parseInt(searchParams.get("percentage"), 10) || 100;
    const location = searchParams.get("location");
    const department = searchParams.get("department");

    // Construct filter object
    let filter = { cutoff: { $lte: percentage } };
    if (location) filter.location = new RegExp(location, "i"); // Case-insensitive search
    if (department) filter.department = department;

    // Fetch data
    const colleges = await College.find(filter).sort({ ranking: 1 });

    return NextResponse.json({ success: true, data: colleges }, { status: 200 });
  } catch (error) {
    console.error("Error fetching colleges:", error.message);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
