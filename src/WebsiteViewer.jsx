import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./WebsiteViewer.css";

function WebsiteViewer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, url } = location.state || {};

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close drawer on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDrawerOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDrawerOpen]);

  useEffect(() => {
    if (!url) {
      navigate("/applications");
    }
  }, [url, navigate]);

  return (
    <div className={`home-wrapper ${isDrawerOpen ? "drawer-open" : ""}`}>
      <Sidebar sidebarRef={sidebarRef} onClose={() => setIsDrawerOpen(false)} />
      <main className="main-content">
        <Navbar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
        <iframe
          title={title}
          src={url}
          frameBorder="0"
          allowFullScreen
          className="report-iframe"
        />
      </main>
    </div>
  );
}

export default WebsiteViewer;
