import bcrypt from "bcrypt";
import { pool } from "../config/db.js";
import { validateLogin, validateRegister } from "../utils/validators.js";

const REDIRECT_URL = "https://movieland-omega-steel.vercel.app/";

export async function register(req, res) {
  try {
    const err = validateRegister(req.body);
    if (err) return res.status(400).json({ message: err });

    const { userId, username, password, email, phone } = req.body;

    const [exists] = await pool.execute(
      "SELECT id FROM movieusers WHERE user_id = ? OR username = ? OR email = ? LIMIT 1",
      [userId, username, email]
    );

    if (exists.length > 0) {
      return res.status(409).json({ message: "User ID, username, or email already exists." });
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.execute(
      "INSERT INTO movieusers (user_id, username, password_hash, email, phone) VALUES (?, ?, ?, ?, ?)",
      [userId, username, hashed, email, phone]
    );

    return res.status(201).json({ message: "Registration successful." });
  } catch {
    return res.status(500).json({ message: "Registration failed." });
  }
}

export async function login(req, res) {
  try {
    const err = validateLogin(req.body);
    if (err) return res.status(400).json({ message: err });

    const { username, password } = req.body;

    const [rows] = await pool.execute(
      "SELECT id, password_hash FROM movieusers WHERE username = ? LIMIT 1",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const ok = await bcrypt.compare(password, rows[0].password_hash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    return res.json({ message: "Login successful.", redirectUrl: REDIRECT_URL });
  } catch {
    return res.status(500).json({ message: "Login failed." });
  }
}