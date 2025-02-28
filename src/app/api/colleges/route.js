import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("collegejunction");
    const colleges = await db.collection("colleges").find({}).toArray();

    return NextResponse.json(colleges);
  } catch (_) { // ✅ ESLint will ignore this
    console.error("Error fetching colleges");

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
