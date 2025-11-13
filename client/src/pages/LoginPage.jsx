import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import "./styles/LoginPage.css";
import BackgroundImage from "./images/background_img.png";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    loginAsRole: "user",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page-wrapper"
      style={{
        background: `url(${BackgroundImage}) center center/cover no-repeat, #081083`,
      }}
    >
      <div className="login-card" role="form" aria-labelledby="login-title">
        <h1 id="login-title" className="login-title">
          Sign In
        </h1>
        <p className="login-subtitle">Access your dashboard</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="loginAsRole">Login As</label>
            <select
              id="loginAsRole"
              name="loginAsRole"
              value={form.loginAsRole}
              onChange={handleChange}
              className="role-select"
              required
            >
              <option value="user"> Client</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <div className="login-footer-text">
            <span>Forgot password?</span>
          </div>
          <div className="register-link">
            <span>Don't have an account? </span>
            <a href="/register" className="register-btn">
              Register here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
