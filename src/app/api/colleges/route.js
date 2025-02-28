import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // ✅ Ensure correct import

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("collegejunction"); // ✅ Your actual DB name
    const colleges = await db.collection("colleges").find({}).toArray();

    console.log("Colleges Data:", colleges); // ✅ Debug fetched data

    return NextResponse.json({ success: true, data: colleges }); // ✅ Structured response
  } catch (error) {
    console.error("Error fetching colleges:", error.message); // ✅ Ensure error is used properly
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
