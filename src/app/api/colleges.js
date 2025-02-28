import { connectToDatabase } from "../../lib/mongodb";
import College from "../../models/College";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const { percentage, location, department } = req.query;
      let filter = { cutoff: { $lte: parseInt(percentage) || 100 } };

      if (location) filter.location = new RegExp(location, "i"); // Case-insensitive search
      if (department) filter.department = department;

      const colleges = await College.find(filter).sort({ ranking: 1 });
      res.status(200).json(colleges);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
