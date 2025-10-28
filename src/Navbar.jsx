import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

function Navbar({ isDrawerOpen, setIsDrawerOpen }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();

  // Check login type
  const isLocalUser = sessionStorage.getItem("localUserLoggedIn") === "true";
  const localUsername = sessionStorage.getItem("loggedInUsername") || "";
  const msUsername = (accounts && accounts.length > 0 && (accounts[0].name || accounts[0].username)) || "";

  const displayName = isLocalUser ? localUsername : msUsername;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    try {
      if (isLocalUser) {
        sessionStorage.removeItem("localUserLoggedIn");
        sessionStorage.removeItem("loggedInUsername");
        navigate("/login"); // Make sure /login exists
      } else {
        instance.logoutRedirect({
          postLogoutRedirectUri: "/login", // Ensure this is defined in your app
        });
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <FaBars
          className="menu-toggle"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          title="Toggle Sidebar Menu"
        />
        <img src="/logo.png" alt="Logo" className="topbar-logo" />
        <nav className="top-nav-links">
          <span className="nav-link" onClick={() => navigate("/homepage")} title="Go to Dashboard">
            Home
          </span>
          <span className="nav-link" title="Executive Team Information">
            Executive Team
          </span>
          <span className="nav-link" title="Support Office Contacts">
            Support Office
          </span>
          <span className="nav-link" title="Resident Family Portal">
            Resident Family
          </span>
          <span className="nav-link" title="HIQA Standards & Reports">
            HIQA
          </span>
          <span className="nav-link" title="HSE Resources">
            HSE
          </span>
        </nav>
      </div>

      <div className="topbar-right" ref={dropdownRef}>
        <div className="notification-wrapper" title="Notifications (4 unread)">
          <FaBell className="topbar-icon" />
          <span className="notification-count">4</span>
        </div>

        <div className="user-dropdown" onClick={() => setShowDropdown(!showDropdown)} title="User Profile & Settings">
          <FaUserCircle className="topbar-icon" />
          {displayName && (
            <span className="username-label">Hi, {displayName}</span>
          )}
          {showDropdown && (
            <div className="dropdown-menu">
              {/* <div className="dropdown-item">Profile</div> */}
              <div className="dropdown-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
