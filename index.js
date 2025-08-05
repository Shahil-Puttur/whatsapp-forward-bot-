// Connect to PostgreSQL
const { Client: PgClient } = require('pg');
const db = new PgClient({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
await db.connect();

// Create tables once
await db.query(`
  CREATE TABLE IF NOT EXISTS batches (
    code TEXT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW()
  );
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    code TEXT REFERENCES batches(code),
    chat_id TEXT,
    message_id TEXT
  );
`);
