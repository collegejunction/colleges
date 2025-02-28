import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // Ensure correct import

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("collegejunction"); // Ensure your actual DB name
    const colleges = await db.collection("colleges").find({}).toArray();

    console.log("Fetched Colleges Data:", colleges); // Debugging log

    return NextResponse.json({ data: colleges }, { status: 200 });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
