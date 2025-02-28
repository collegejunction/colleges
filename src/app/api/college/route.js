import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import College from "@/models/College";

export async function GET(req) {
  try {
    await connectToDatabase();

    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const percentage = parseInt(searchParams.get("percentage")) || 100;
    const location = searchParams.get("location") || "";
    const department = searchParams.get("department") || "";

    let filter = { cutoff: { $lte: percentage } };

    if (location) filter.location = new RegExp(location, "i"); // Case-insensitive
    if (department) filter.department = department;

    const colleges = await College.find(filter).sort({ ranking: 1 });

    return NextResponse.json(colleges, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
