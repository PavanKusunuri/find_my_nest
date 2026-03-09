import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaHome, FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";

const Register = () => {
  const { register } = useAuth();
  const history = useHistory();
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    phone: "", role: "tenant",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...data } = form;
      const user = await register(data);
      toast.success(`Welcome, ${user.name}! Account created.`);
      history.push(user.role === "owner" ? "/owner/dashboard" : "/");
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
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join thousands finding their perfect nest</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label><FaUser /> Full Name</label>
            <input type="text" name="name" required placeholder="Your name" value={form.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label><FaEnvelope /> Email</label>
            <input type="email" name="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label><FaPhone /> Phone</label>
            <input type="tel" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>I am a</label>
            <div className="role-toggle">
              <button type="button"
                className={`toggle-btn ${form.role === "tenant" ? "active" : ""}`}
                onClick={() => setForm({ ...form, role: "tenant" })}>
                🔍 Looking for a place
              </button>
              <button type="button"
                className={`toggle-btn ${form.role === "owner" ? "active" : ""}`}
                onClick={() => setForm({ ...form, role: "owner" })}>
                🏠 Listing a property
              </button>
            </div>
          </div>
          <div className="form-group">
            <label><FaLock /> Password</label>
            <input type="password" name="password" required minLength={6} placeholder="••••••••" value={form.password} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label><FaLock /> Confirm Password</label>
            <input type="password" name="confirmPassword" required placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} />
          </div>
          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
