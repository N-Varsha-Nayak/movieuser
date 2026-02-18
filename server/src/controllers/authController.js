import bcrypt from "bcrypt";
import { pool } from "../config/db.js";
import { validateLogin, validateRegistration } from "../utils/validators.js";

const SALT_ROUNDS = 10;
const REDIRECT_URL = "https://movieland-omega-steel.vercel.app/";

export async function registerUser(req, res) {
  try {
    const validationError = validateRegistration(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { userId, username, password, email, phone } = req.body;

    const [existing] = await pool.execute(
      "SELECT id FROM users WHERE user_id = ? OR username = ? OR email = ? LIMIT 1",
      [userId, username, email]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "User ID, username, or email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    await pool.execute(
      "INSERT INTO users (user_id, username, password_hash, email, phone) VALUES (?, ?, ?, ?, ?)",
      [userId, username, passwordHash, email, phone]
    );

    return res.status(201).json({ message: "Registration successful." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to register user." });
  }
}

export async function loginUser(req, res) {
  try {
    const validationError = validateLogin(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { username, password } = req.body;

    const [rows] = await pool.execute(
      "SELECT id, password_hash FROM users WHERE username = ? LIMIT 1",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const isMatch = await bcrypt.compare(password, rows[0].password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    return res.json({ message: "Login successful.", redirectUrl: REDIRECT_URL });
  } catch (error) {
    return res.status(500).json({ message: "Failed to login." });
  }
}