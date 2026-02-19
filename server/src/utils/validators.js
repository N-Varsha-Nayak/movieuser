export function validateRegister(body) {
  const { userId, username, password, email, phone } = body;

  if (!/^[A-Za-z0-9_]{3,30}$/.test(userId || "")) return "Invalid userId.";
  if (!/^[A-Za-z0-9_]{3,30}$/.test(username || "")) return "Invalid username.";
  if (!/^(?=.*[A-Za-z])(?=.*\d).{8,64}$/.test(password || "")) return "Password must be at least 8 chars with letters and numbers.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")) return "Invalid email.";
  if (!/^\+?[0-9]{10,15}$/.test(phone || "")) return "Invalid phone.";

  return null;
}

export function validateLogin(body) {
  const { username, password } = body;
  if (!username || !password) return "Username and password are required.";
  return null;
}