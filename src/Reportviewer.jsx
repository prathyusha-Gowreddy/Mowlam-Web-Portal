import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Reportviewer.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Reportviewer() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const sidebarRef = useRef(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Prefer location.state, fallback to query params
  const title = location.state?.title || query.get("title");
  const reportUrl = location.state?.reportUrl || query.get("reportUrl");

  const decodedTitle = title ? decodeURIComponent(title) : "";
  const decodedReportUrl = reportUrl ? decodeURIComponent(reportUrl) : "";

  // Check login status from localStorage (not sessionStorage)
  const isLocalUser = localStorage.getItem("localUserLoggedIn") === "true";
  const isMSUser =
    !!localStorage.getItem("msal.idtoken") ||
    !!localStorage.getItem("msal.account.keys");
  const isLoggedIn = isLocalUser || isMSUser;

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // Redirect if no report URL
  useEffect(() => {
    if (!decodedReportUrl) {
      navigate("/reporting");
    }
  }, [decodedReportUrl, navigate]);

  // Sidebar auto-close on outside click
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

  if (!decodedReportUrl) {
    return <div>No report selected or invalid URL.</div>;
  }

  return (
    <div className={`home-wrapper ${isDrawerOpen ? "drawer-open" : ""}`}>
      <Sidebar sidebarRef={sidebarRef} onClose={() => setIsDrawerOpen(false)} />
      <main className="main-content">
        <Navbar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
        {/* Title removed as per your request */}
        <iframe
          title={decodedTitle || "Report"}
          src={decodedReportUrl}
          frameBorder="0"
          allowFullScreen
          className="report-iframe"
        />
      </main>
    </div>
  );
}

export default Reportviewer;
