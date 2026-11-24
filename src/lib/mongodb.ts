import { MongoClient } from 'mongodb';
import dns from 'dns';

// Ensure SRV DNS resolution succeeds across local resolvers
if (typeof dns.setServers === 'function') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch {
    // Ignore if not permitted
  }
}

// One shared database connection for the whole server. It lives on globalThis
// so the dev server's hot reloads reuse it instead of opening (and leaking) a
// new connection pool on every code change, which used to stall pages for
// seconds. A failed connection is forgotten, so the next request retries.
// src/instrumentation.ts opens it as soon as the server starts.

const uri = process.env.MONGODB_URI || process.env.MONGO_URL;
const TIMEOUT_MS = 5000;

const globalForMongo = globalThis as typeof globalThis & { _mongoClientPromise?: Promise<MongoClient> };

export async function connectToDatabase() {
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: TIMEOUT_MS, connectTimeoutMS: TIMEOUT_MS });
    globalForMongo._mongoClientPromise = client.connect().catch((error: unknown) => {
      globalForMongo._mongoClientPromise = undefined;
      throw error;
    });
  }

  return { client: await globalForMongo._mongoClientPromise };
}

// The site's data lives in this database. Set MONGODB_DB to use another one
// (the connection string itself has no database name, so the driver would
// otherwise fall back to the empty "test" database).
export const DB_NAME = process.env.MONGODB_DB || 'gdg_nmit';

export async function getDb() {
  const { client } = await connectToDatabase();
  return client.db(DB_NAME);
}
