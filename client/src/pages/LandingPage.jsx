import React from "react";
import { useAuth } from "../context/AuthContext";
import "./styles/LandingPageStyle.css";
import landingImage from "./images/feature-pic-01-5.png";
import BackgroundImage from "./images/background_img.png";

function LandingPage() {
  const { isAuthenticated, user, logout } = useAuth();

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
              <span className="navbar-user">Welcome, {user?.email}</span>
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
          THE DEVELOPMENT OF A MACHINE LEARNING-POWERED CLOG DETECTION SYSTEM
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
        <section className="landing-background">
          <h2>Background of the Study</h2>
          <p>
            The Philippines is a tropical country that frequently experiences
            heavy rainfall and an average of 20 tropical cyclones (PAGASA,
            n.d.). This indicates that the Philippines is prone to experience
            flooding, especially in continuous occurrence of inclement weather
            conditions. Developing regions in the Philippines, including Region
            VI focus their efforts on urbanization and infrastructure
            development. One of the challenges faced by urbanization in tropical
            countries that experience heavy rainfalls includes uncontrolled
            flooding resulting in flood loss, especially when weather parameters
            are vague. The Philippines records approximately 200,000 deaths
            caused by weather-related disasters between 2000 and 2019 (Gray et
            al., 2022). The NOAA National Severe Storms Laboratory of the US
            Government (n.d.) stated that “floods are the most common and
            widespread of all weather-related natural disasters.” Therefore,
            floods must be monitored and predicted in order to mitigate the
            damage brought by typhoons and heavy rainfall. According to an
            article in ReliefWeb, written by the AHA Centre (2023), on February
            15, 2023, Region VI suffered flooding in 51 barangays, wherein 1,221
            families were affected. In the same article written by the AHA
            Centre (2023), 13 roads and 1 bridge were affected. This implies
            that Filipinos, especially commuters, suffered inconvenience and
            exposed themselves to hazardous risk caused by flooding.
            Insufficient information and warning of recurring events such as
            flooding, pose a major challenge on the safety of Filipino
            communities. Hence, the proponents aim to develop a machine
            learning-powered clog and flow rate flood detection system.
          </p>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
