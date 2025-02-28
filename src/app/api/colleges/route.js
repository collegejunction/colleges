import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("collegejunction");

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid College ID" }, { status: 400 });
    }

    const college = await db.collection("colleges").findOne({
      _id: new ObjectId(params.id),
    });

    if (!college) {
      return NextResponse.json({ error: "❌ College not found" }, { status: 404 });
    }

    return NextResponse.json(college);
  } catch {
    console.error("Error fetching college");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
