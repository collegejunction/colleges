import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/"; // Your MongoDB URI
const dbName = "collegejunction"; // Database Name

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests are allowed" });
  }

  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const colleges = await db.collection("colleges").find({}).toArray();

    client.close();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data", error: error.message });
  }
}
