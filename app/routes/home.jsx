import React, { useState } from "react";
import "./home.scss";
// import { Helmet } from "react-helmet-async";

import AddLinks from "./components/addLinks/AddLinks";

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

function Home() {
  const [links, setLinks] = useState([]);
  const [savedLinks, setSavedLinks] = useState([]);

  const handleAddLink = () => {
    setLinks([
      ...links,
      {
        id: Date.now(),
        platform: "github",
        url: "",
      },
    ]);
  };

  const handleRemoveLink = (indexToRemove) => {
    const updatedLinks = links.filter((_, i) => i !== indexToRemove);
    setLinks(updatedLinks);
    const updatedSavedLinks = savedLinks.filter((_, i) => i !== indexToRemove);
    setSavedLinks(updatedSavedLinks);
    localStorage.setItem("savedLinks", JSON.stringify(updatedSavedLinks));
  };

  const handleUpdateLink = (index, updatedData) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], ...updatedData };
    setLinks(newLinks);
  };
  const handleSave = () => {
    const validLinks = links.filter((link) => link.platform && link.url);
    setSavedLinks(validLinks);
    localStorage.setItem("savedLinks", JSON.stringify(validLinks));
  };

  return (
    // <>
    //   <Helmet>
    //     <title>DevLinks</title>
    //   </Helmet>
    <div className="home">
      {/* Left: Mobile Phone */}
      <div className="home-left">
        <div className="phone-frame">
          <img
            className="phone-bg"
            src="/images/illustration-phone-mockup.svg"
            alt="Phone mockup"
          />
          <div className="phone-links">
            {savedLinks.map((link, i) => {
              const platform = platforms.find((p) => p.value === link.platform);
              return (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mobile-link ${link.platform}`}
                >
                  <img src={platform.icon} alt={platform.label} />
                  {platform.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="home-right">
        <div className="right-head">
          <h1>Customize your links</h1>
          <p>
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </div>

        <button className="add-btn" onClick={handleAddLink}>
          + Add new link
        </button>

        {links.length === 0 ? (
          <div className="before-data">
            <img
              src="/images/illustration-empty.svg"
              alt="Empty illustration"
            />
            <h2>Let’s get you started</h2>
            <p>
              Use the <b>“Add new link”</b> button to get started. Once you have
              more than one link, you can reorder and edit them. We’re here to
              help you share your profiles with everyone!
            </p>
          </div>
        ) : (
          <div className="after-data">
            {links.map((link, i) => (
              <AddLinks
                key={link.id}
                index={i}
                data={link}
                onRemove={handleRemoveLink}
                onChange={handleUpdateLink}
              />
            ))}
          </div>
        )}

        <div className="right-save-btn">
          <button disabled={links.length === 0} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
    // </>
  );
}

export default Home;
