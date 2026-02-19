import { useState } from "react";
import { Link } from "react-router-dom";
import { postApi } from "../api";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.password) {
      setError("Username and password are required.");
      return;
    }

    try {
      setLoading(true);
      const data = await postApi("/login", form);
      window.location.href = data.redirectUrl;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="netflix-bg">
      <section className="glass-card">
        <h1>Sign in</h1>
        <p className="sub">Watch everywhere. Cancel anytime.</p>

        <form onSubmit={onSubmit} noValidate>
          <label>Username<input name="username" value={form.username} onChange={onChange} placeholder="netflixfan" /></label>
          <label>Password<input type="password" name="password" value={form.password} onChange={onChange} placeholder="********" /></label>

          {error && <p className="err global">{error}</p>}
          <button disabled={loading} type="submit">{loading ? "Signing in..." : "Login"}</button>
        </form>

        <p className="switch">New here? <Link to="/register">Create account</Link></p>
      </section>
    </main>
  );
}