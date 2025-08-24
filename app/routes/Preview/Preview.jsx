import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./preview.scss";

const platforms = [
  { value: "github", label: "GitHub", icon: "/images/icon-github.svg" },
  { value: "youtube", label: "YouTube", icon: "/images/icon-youtube.svg" },
  { value: "linkedin", label: "LinkedIn", icon: "/images/icon-linkedin.svg" },
  { value: "facebook", label: "Facebook", icon: "/images/icon-facebook.svg" },
  {
    value: "frontend-mentor",
    label: "Frontend Mentor",
    icon: "/images/icon-frontend-mentor.svg",
  },
  { value: "hashnode", label: "Hashnode", icon: "/images/icon-hashnode.svg" },
];

function Preview() {
  const [savedLinks, setSavedLinks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLinks = localStorage.getItem("savedLinks");
    if (storedLinks) {
      setSavedLinks(JSON.parse(storedLinks));
    }
  }, []);

  const handleRemove = (indexToRemove) => {
    const updatedLinks = savedLinks.filter((_, i) => i !== indexToRemove);
    setSavedLinks(updatedLinks);
  };

  const handleSave = () => {
    localStorage.setItem("savedLinks", JSON.stringify(savedLinks));
    alert("Changes saved!");
  };

  return (
    <div className="preview">
      <h1>Preview Page</h1>
      <div className="preview-left">
        <div className="phone-frame">
          <img
            className="phone-bg"
            src="/images/illustration-phone-mockup.svg"
            alt="Phone mockup"
          />
          <div className="phone-avatar">
            <img
              className="avatar-img"
              src="/images/icon-profile-details-header.svg"
              alt="User Avatar"
            />
            <p className="avatar-para">You can preview your links here:</p>
            <div className="phone-links">
              {savedLinks.map((link, i) => {
                const platform = platforms.find(
                  (p) => p.value === link.platform
                );
                return (
                  <div key={i} className="preview-link-item">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobile-link"
                    >
                      <img src={platform.icon} alt={platform.label} />
                      {platform.label}
                    </a>
                    <button
                      className="remove-button"
                      onClick={() => handleRemove(i)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="preview-actions">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <button
            className="save-button"
            onClick={handleSave}
            disabled={savedLinks.length === 0}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Preview;
