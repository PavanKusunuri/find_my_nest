import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaHome } from "react-icons/fa";

const Login = () => {
  const { login } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.name}!`);
      if (user.role === "owner" || user.role === "admin") {
        history.push("/owner/dashboard");
      } else {
        history.push(from);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <FaHome /> <span>FindMyNest</span>
        </div>
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label><FaEnvelope /> Email</label>
            <input
              type="email" name="email" required
              placeholder="your@email.com"
              value={form.email} onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label><FaLock /> Password</label>
            <input
              type="password" name="password" required
              placeholder="••••••••"
              value={form.password} onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
