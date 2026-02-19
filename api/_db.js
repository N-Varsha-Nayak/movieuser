const mysql = require("mysql2/promise");

let pool;
let initPromise;

function getPool() {
  if (!pool) {
    const sslEnabled = process.env.DB_SSL === "true";
    const rejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED === "true";

    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      ssl: sslEnabled ? { rejectUnauthorized } : undefined
    });
  }

  return pool;
}

async function ensureMovieUsersTable() {
  if (!initPromise) {
    const db = getPool();
    initPromise = db.execute(`
      CREATE TABLE IF NOT EXISTS movieusers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(30) NOT NULL UNIQUE,
        username VARCHAR(30) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(120) NOT NULL UNIQUE,
        phone VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  await initPromise;
}

module.exports = { getPool, ensureMovieUsersTable };
