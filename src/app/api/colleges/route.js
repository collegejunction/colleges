export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("collegejunction");
    const colleges = await db.collection("colleges").find({}).toArray();

    return NextResponse.json({ success: true, data: colleges }, { status: 200 });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    console.error("Error fetching colleges:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
