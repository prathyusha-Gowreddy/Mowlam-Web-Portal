import React, { useState, useEffect, useRef } from "react";
import "./Homepage.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FaThumbtack, FaPlus, FaMinus, FaChartBar, FaGlobe } from "react-icons/fa";
import Slideshow from "./Slideshow";
import { useNavigate } from "react-router-dom"; // 👈 react-router hook

function Homepage() {
  const [showFavorites, setShowFavorites] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate(); // 👈 Initialize navigate

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

  return (
    <div className={`home-wrapper ${isDrawerOpen ? "drawer-open" : ""}`}>
      <Sidebar
        sidebarRef={sidebarRef}
        onClose={() => setIsDrawerOpen(false)}
      />
      <main className="main-content">
        <Navbar
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />

        <div className="notification-ticker">
          <marquee>
            <span className="ticker-item">🏥 Mowlam Healthcare has acquired a new nursing home in Galway, expanding our care network across the West of Ireland.</span>
            <span className="ticker-item">🏆 Mowlam Healthcare awarded “Best Elderly Care Provider 2025” by Irish Healthcare Awards.</span>
            <span className="ticker-item">📣 Staff appreciation event scheduled for July 20th in Cork — all team members invited!</span>
            <span className="ticker-item">🔔 New electronic health record (EHR) system rollout begins August 1st – training sessions available online.</span>
          </marquee>
        </div>

        <section className="slideshow-banner">
          <Slideshow />
          <div className="slideshow-overlay">
            <div className="typing-text">WE LISTEN. WE CARE.</div>
          </div>
        </section>

        <section className="favorites-section">
          <div className="favorites-header">
            <div className="favorites-title">
              <FaThumbtack />
              <span>Favourites / Pinned</span>
            </div>
            <div className="toggle-icon" onClick={() => setShowFavorites(!showFavorites)}>
              {showFavorites ? <FaMinus /> : <FaPlus />}
            </div>
          </div>

          {showFavorites && (
            <div className="favorites-grid">
              <div className="favorite-card"><FaChartBar /> Rehabilitation Analysis</div>
              <div className="favorite-card"><FaGlobe /> Epicare</div>
              <div className="favorite-card"><FaGlobe /> Origin</div>
              <div className="favorite-card"><FaGlobe /> Vi Clarity</div>
            </div>
          )}
        </section>

        <section className="animated-background1">
          <div className="main-cards1">
            <div
              className="card1"
              data-bg="reports1"
              onClick={() => navigate("/icons")} // ✅ Navigate to Reporting.jsx
            >
              <span>Reporting</span>
            </div>

            <div
              className="card1"
              data-bg="websites1"
              onClick={() => navigate("/applications")} // ✅ Navigate to Applications.jsx
            >
              <span>Applications</span>
            </div>

            <div className="card1" data-bg="password1">
              <span>Employee Portal</span>
            </div>

            <div className="card1" data-bg="faq1">
              <span>Help / FAQ</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Homepage;
