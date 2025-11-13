import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./styles/RegisterPage.css";
import BackgroundImage from "./images/background_img.png";

function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
    setSuccess(""); // Clear success message when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        setSuccess("Registration successful! Redirecting to login...");
        setForm({ email: "", password: "" });
        // Clear form
        // Redirect to login page after a delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="register-page-wrapper"
      style={{
        background: `url(${BackgroundImage}) center center/cover no-repeat, #081083`,
      }}
    >
      <div
        className="register-card"
        role="form"
        aria-labelledby="register-title"
      >
        <h1 id="register-title" className="register-title">
          Create Account
        </h1>
        <p className="register-subtitle">Join us today</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="register-form">
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <div className="login-link">
            <span>Already have an account? </span>
            <a href="/login" className="login-btn">
              Sign in here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
