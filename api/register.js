const bcrypt = require("bcrypt");
const { getPool, ensureMovieUsersTable } = require("./_db");

function validateRegister(body) {
  const { userId, username, password, email, phone } = body || {};

  if (!/^[A-Za-z0-9_]{3,30}$/.test(userId || "")) return "Invalid userId.";
  if (!/^[A-Za-z0-9_]{3,30}$/.test(username || "")) return "Invalid username.";
  if (!/^(?=.*[A-Za-z])(?=.*\d).{8,64}$/.test(password || "")) {
    return "Password must be at least 8 chars with letters and numbers.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")) return "Invalid email.";
  if (!/^\+?[0-9]{10,15}$/.test(phone || "")) return "Invalid phone.";
  return null;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await ensureMovieUsersTable();
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const err = validateRegister(body);
    if (err) return res.status(400).json({ message: err });

    const { userId, username, password, email, phone } = body;
    const db = getPool();

    const [exists] = await db.execute(
      "SELECT id FROM movieusers WHERE user_id = ? OR username = ? OR email = ? LIMIT 1",
      [userId, username, email]
    );

    if (exists.length > 0) {
      return res.status(409).json({ message: "User ID, username, or email already exists." });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.execute(
      "INSERT INTO movieusers (user_id, username, password_hash, email, phone) VALUES (?, ?, ?, ?, ?)",
      [userId, username, hashed, email, phone]
    );

    return res.status(201).json({ message: "Registration successful." });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed." });
  }
};
