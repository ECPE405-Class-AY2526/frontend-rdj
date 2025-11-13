import React from "react";
import { useAuth } from "../context/AuthContext";
import "./styles/LandingPageStyle.css";
import landingImage from "./images/Figure.png";
import BackgroundImage from "./images/background_img.png";

function Dashboard() {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

  return (
    <div
      className="landing-container"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <header className="navbar">
        <div className="navbar-logo">RDJ</div>
        <nav className="navbar-links">
          {isAuthenticated ? (
            <>
              <a href="/dashboard" className="navbar-link">
                Dashboard
              </a>
              {isAdmin && (
                <a href="/user-management" className="navbar-link">
                  User Management
                </a>
              )}
              <span className="navbar-user">
                {isAdmin ? "Admin" : "User"}: {user?.email}
              </span>
              <button
                onClick={logout}
                className="navbar-link logout-btn"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/" className="navbar-link">
                About us
              </a>
              <a href="/login" className="navbar-link">
                Login
              </a>
              <a href="/register" className="navbar-link">
                Register
              </a>
            </>
          )}
        </nav>
      </header>

      <main className="landing-content">
        <h1>
          {" "}
          <span className="navbar-user">Welcome, {user?.email}</span>
        </h1>
        <section className="LandingPageImage">
          <img
            src={landingImage}
            alt="Clog Detection System"
            style={{
              boxShadow: "0 8px 32px 0 rgba(8, 16, 131, 0.25)",
              borderRadius: "16px",
              width: "800px",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
