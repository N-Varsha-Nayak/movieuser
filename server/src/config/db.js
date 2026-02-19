import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const sslEnabled = process.env.DB_SSL === "true";
const rejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED === "true";

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: sslEnabled ? { rejectUnauthorized } : undefined
});

export async function initDb() {
  await pool.execute(`
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