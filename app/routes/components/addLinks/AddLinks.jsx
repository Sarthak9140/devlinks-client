import React, { useState } from "react";
import "./AddLink.scss";

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

function AddLinks({ index, data, onRemove, onChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedPlatform = platforms.find((p) => p.value === data.platform);

  const handlePlatformSelect = (platform) => {
    onChange(index, { platform: platform.value });
    setDropdownOpen(false);
  };

  const handleUrlChange = (e) => {
    onChange(index, { url: e.target.value });
  };

  const handleRemove = () => {
    onRemove(index);
  };

  const urlRegex =
    /^(https?:\/\/)?(www\.)?(github\.com|youtube\.com|linkedin\.com|facebook\.com|frontendmentor\.io|hashnode\.com)(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
  const isUrlInvalid = data.url && !urlRegex.test(data.url);

  return (
    <div className="addlink">
      <div className="link-header">
        <div className="drag-handle">
          <img src="/images/icon-drag-and-drop.svg" alt="drag drop" />
        </div>
        <span className="link-index">Link {index + 1}</span>
        <button type="button" className="remove-link" onClick={handleRemove}>
          Remove
        </button>
      </div>

      <div className="platform">
        <label>Platform</label>
        <div className={`custom-select ${dropdownOpen ? "open" : ""}`}>
          {/* Toggle only when clicking the selected div */}
          <div
            className="selected"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <img src={selectedPlatform.icon} alt={selectedPlatform.label} />
            <span>{selectedPlatform.label}</span>
            <img
              className="arrow"
              src="/images/icon-chevron-down.svg"
              alt="Dropdown arrow"
            />
          </div>

          {dropdownOpen && (
            <div className="options">
              {platforms.map((p) => (
                <div
                  key={p.value}
                  className="option"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from bubbling up
                    handlePlatformSelect(p);
                  }}
                >
                  <img src={p.icon} alt={p.label} />
                  <span>{p.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Link input */}
      <div className="add-link">
        <label htmlFor={`link-${index}`}>Link</label>
        <input
          type="url"
          id={`link-${index}`}
          placeholder="https://example.com"
          value={data.url}
          onChange={handleUrlChange}
          className={isUrlInvalid ? "error" : ""}
        />
        {isUrlInvalid && (
          <span className="error-message">Please enter a valid URL</span>
        )}
      </div>
    </div>
  );
}

export default AddLinks;
