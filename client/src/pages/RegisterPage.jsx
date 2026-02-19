import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postApi } from "../api";

const init = { userId: "", username: "", password: "", email: "", phone: "" };

function validate(v) {
  const e = {};
  if (!/^[A-Za-z0-9_]{3,30}$/.test(v.userId)) e.userId = "Use 3-30 letters/numbers/_";
  if (!/^[A-Za-z0-9_]{3,30}$/.test(v.username)) e.username = "Use 3-30 letters/numbers/_";
  if (!/^(?=.*[A-Za-z])(?=.*\d).{8,64}$/.test(v.password)) e.password = "Min 8 chars, include letter + number";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter valid email";
  if (!/^\+?[0-9]{10,15}$/.test(v.phone)) e.phone = "Phone must be 10-15 digits";
  return e;
}

export default function RegisterPage() {
  const [form, setForm] = useState(init);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setLoading(true);
      await postApi("/register", form);
      navigate("/login");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="netflix-bg">
      <section className="glass-card">
        <h1>Create your account</h1>
        <p className="sub">Start your MovieLand journey.</p>

        <form onSubmit={onSubmit} noValidate>
          <label>User ID<input name="userId" value={form.userId} onChange={onChange} placeholder="user_123" />{errors.userId && <span className="err">{errors.userId}</span>}</label>
          <label>Username<input name="username" value={form.username} onChange={onChange} placeholder="netflixfan" />{errors.username && <span className="err">{errors.username}</span>}</label>
          <label>Password<input type="password" name="password" value={form.password} onChange={onChange} placeholder="********" />{errors.password && <span className="err">{errors.password}</span>}</label>
          <label>Email<input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@email.com" />{errors.email && <span className="err">{errors.email}</span>}</label>
          <label>Phone<input name="phone" value={form.phone} onChange={onChange} placeholder="+911234567890" />{errors.phone && <span className="err">{errors.phone}</span>}</label>

          {apiError && <p className="err global">{apiError}</p>}
          <button disabled={loading} type="submit">{loading ? "Creating..." : "Register"}</button>
        </form>

        <p className="switch">Already registered? <Link to="/login">Sign in</Link></p>
      </section>
    </main>
  );
}