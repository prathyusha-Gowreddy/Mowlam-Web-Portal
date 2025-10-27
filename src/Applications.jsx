import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Applications.css";
import { useNavigate } from "react-router-dom";

function Applications() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sidebarRef = useRef(null);

  const localUser = sessionStorage.getItem("loggedInUsername");
  const msUsername = sessionStorage.getItem("msal.account.keys")
    ? JSON.parse(sessionStorage.getItem("msal.account.keys"))[0]?.name || ""
    : "";

  const navigate = useNavigate();

  const handleCardClick = (title, url) => {
    navigate("/website-viewer", {
      state: { title, url },
    });
  };

  const currentUsername = localUser || msUsername;

  const isAshok = currentUsername === "Ashok_MLHC";

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
    <div
      className={`applications-wrapper ${isDrawerOpen ? "drawer-open" : ""}`}
    >
      <Sidebar sidebarRef={sidebarRef} onClose={() => setIsDrawerOpen(false)} />

      <main className="applications-main-content">
        <Navbar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />

        {isAshok ? (
          <section className="applications-cards">
            <div
              className="card"
              data-bg="epicare"
              onClick={() =>
                handleCardClick(
                  "Epicare",
                  "" // via proxy
                )
              }
            >
              <span>Epicare</span>
            </div>
            <div className="card" data-bg="origin">
              <span>Origin</span>
            </div>
            <div
              className="card"
              data-bg="viclarity"
              onClick={() => handleCardClick("Vi Clarity", "")}
            >
              <span>Vi Clarity</span>
            </div>
            <div className="card" data-bg="eclaims">
              <span>Employee Portal</span>
            </div>
          </section>
        ) : (
          <section className="access-denied">
            <h2>You do not have access to these websites.</h2>
          </section>
        )}
      </main>
    </div>
  );
}

export default Applications;
