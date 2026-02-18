import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const useSsl = process.env.DB_SSL === "true";
const rejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED === "true";

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: useSsl ? { rejectUnauthorized } : undefined
});

export async function initializeDatabase() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id VARCHAR(30) NOT NULL UNIQUE,
      username VARCHAR(30) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      phone VARCHAR(15) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}