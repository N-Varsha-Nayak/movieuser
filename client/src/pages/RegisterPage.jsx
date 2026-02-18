import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRequest } from "../api";

const initialState = {
  userId: "",
  username: "",
  password: "",
  email: "",
  phone: ""
};

function validate(values) {
  const errors = {};

  if (!/^[a-zA-Z0-9_]{3,30}$/.test(values.userId)) {
    errors.userId = "User ID must be 3-30 chars (letters, numbers, underscore).";
  }

  if (!/^[a-zA-Z0-9_]{3,30}$/.test(values.username)) {
    errors.username = "Username must be 3-30 chars (letters, numbers, underscore).";
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d).{8,64}$/.test(values.password)) {
    errors.password = "Password must be 8+ chars and include letters and numbers.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!/^\+?[0-9]{10,15}$/.test(values.phone)) {
    errors.phone = "Phone must be 10-15 digits (optional +).";
  }

  return errors;
}

export default function RegisterPage() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError("");

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      await apiRequest("/register", form);
      navigate("/login");
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-bg">
      <section className="glass-card">
        <h1>Create Account</h1>
        <p className="subtitle">Join MovieLand with your profile details.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label>
            User ID
            <input name="userId" value={form.userId} onChange={handleChange} placeholder="user_1001" />
            {errors.userId && <span className="error">{errors.userId}</span>}
          </label>

          <label>
            Username
            <input name="username" value={form.username} onChange={handleChange} placeholder="cinemaFan" />
            {errors.username && <span className="error">{errors.username}</span>}
          </label>

          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="********" />
            {errors.password && <span className="error">{errors.password}</span>}
          </label>

          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@example.com" />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label>
            Phone
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+12345678901" />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </label>

          {apiError && <p className="error global">{apiError}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}