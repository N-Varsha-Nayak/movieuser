export function validateRegistration(payload) {
  const { userId, username, password, email, phone } = payload;

  if (!/^[a-zA-Z0-9_]{3,30}$/.test(userId)) {
    return "Invalid userId.";
  }

  if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
    return "Invalid username.";
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d).{8,64}$/.test(password)) {
    return "Password must be 8+ chars with letters and numbers.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email.";
  }

  if (!/^\+?[0-9]{10,15}$/.test(phone)) {
    return "Invalid phone.";
  }

  return null;
}

export function validateLogin(payload) {
  const { username, password } = payload;

  if (!username || !password) {
    return "Username and password are required.";
  }

  return null;
}