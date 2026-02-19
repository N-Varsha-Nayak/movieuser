const bcrypt = require("bcrypt");
const { getPool, ensureMovieUsersTable } = require("./_db");

const REDIRECT_URL = "https://movieland-omega-steel.vercel.app/";

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await ensureMovieUsersTable();
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { username, password } = body || {};

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    const db = getPool();
    const [rows] = await db.execute(
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
  } catch (error) {
    return res.status(500).json({ message: "Login failed." });
  }
};
