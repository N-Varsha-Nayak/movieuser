import { Link } from "react-router-dom";
import { useState } from "react";
import { apiRequest } from "../api";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.username || !form.password) {
      setError("Username and password are required.");
      return;
    }

    try {
      setLoading(true);
      const data = await apiRequest("/login", form);
      window.location.href = data.redirectUrl;
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-bg">
      <section className="glass-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">Log in to continue to MovieLand.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label>
            Username
            <input name="username" value={form.username} onChange={handleChange} placeholder="cinemaFan" />
          </label>

          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="********" />
          </label>

          {error && <p className="error global">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="switch">
          New user? <Link to="/register">Create account</Link>
        </p>
      </section>
    </main>
  );
}