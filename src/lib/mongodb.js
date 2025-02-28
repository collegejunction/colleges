import { MongoClient } from "mongodb";

// MongoDB connection URI
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"; 

if (!uri) {
  throw new Error("⚠️ MongoDB URI is missing!");
}

// Global variable to store the MongoDB client
let client;
let clientPromise;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  globalThis._mongoClientPromise = client.connect();
}

clientPromise = globalThis._mongoClientPromise;

// Named export for easy importing
export async function connectToDatabase() {
  const dbClient = await clientPromise;
  return dbClient.db(); // Change this to your database name if needed
}

export default clientPromise;
