import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Layout.scss";

function Layout() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Guest");
  useEffect(() => {
    const storedName = localStorage.getItem("username");

    if (storedName) {
      try {
        setUsername(JSON.parse(storedName));
      } catch (err) {
        console.error("Failed to parse username from localStorage", err);
        setUsername("Guest");
      }
    }
  }, []);

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="nav-logo" onClick={() => navigate("/home")}>
          <img
            src="/images/logo-devlinks-large.svg"
            alt="Devlinks Logo"
            className="logo-large"
          />
          <img
            src="/images/logo-devlinks-small.svg"
            alt="Devlinks logo"
            className="logo-small"
          />
        </div>
        <nav className="nav-content">
          <div className="nav-item" onClick={() => navigate("/links")}>
            <img src="/images/icon-link-copied-to-clipboard.svg" alt="Links" />
            <span>Links</span>
          </div>
          <div className="nav-item">
            <img src="/images/icon-profile-details-header.svg" alt="Profile" />
            <span>{username}</span>
          </div>
        </nav>
        <div className="preview-btn" onClick={() => navigate("/preview")}>
          <img src="/images/icon-preview-header.svg" alt="Preview" />
          <span>Preview</span>
        </div>
      </header>

      {/* Main content area for children */}
      <main className="layout-body">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
