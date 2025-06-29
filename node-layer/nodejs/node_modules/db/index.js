const { MongoClient } = require('mongodb');

let cachedDb = null;

async function getDb() {
  if (cachedDb) return cachedDb;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Env var MONGODB_URI is missing');

  const client = new MongoClient(uri, { maxPoolSize: 5 });
  await client.connect();
  cachedDb = client.db('kioscoDB');          // change if db name differs
  return cachedDb;
}

module.exports = { getDb };
