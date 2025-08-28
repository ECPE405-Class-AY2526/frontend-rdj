import React from "react";
import "./styles/LandingPageStyle.css";
import landingImage from "./images/feature-pic-01-5.png"; // If inside src folder

function LandingPage() {
  return (
    <div className="landing-container">
      <header className="navbar">
        <div className="navbar-logo">RDJ</div>
        <nav className="navbar-links">
          <a href="/dashboard" className="navbar-link">
            Dashboard
          </a>
          <a href="/" className="navbar-link">
            About us
          </a>
          <a href="/login" className="navbar-link">
            Login
          </a>
        </nav>
      </header>

      <main className="landing-content">
        <h1>
          THE DEVELOPMENT OF A MACHINE LEARNING-POWERED CLOG DETECTION SYSTEM
        </h1>
        <section className="LandingPageImage">
          <img
            src={landingImage}
            alt="Clog Detection System"
            //style={{ width: "300px", marginBottom: "2rem" }}
          />
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
