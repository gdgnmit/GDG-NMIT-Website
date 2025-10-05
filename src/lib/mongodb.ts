import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client: MongoClient | null = null;

export async function connectToDatabase() {
  if (client) return { client };

  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  client = new MongoClient(uri);
  await client.connect();
  return { client };
}
