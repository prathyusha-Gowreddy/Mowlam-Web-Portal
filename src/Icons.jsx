import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {
  FaChartBar,
  FaProcedures,
  FaFileMedicalAlt,
  FaFileInvoiceDollar,
  FaUsers,
  FaWarehouse,
} from "react-icons/fa";

import "./Icons.css"; // CSS file with styling

function Icons() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const iconCards = [
    { label: "Reporting", icon: <FaChartBar />, path: "/reporting", bg: "reports2" },
    { label: "Applications", icon: <FaProcedures />, path: "/applications", bg: "websites2" },
    { label: "Lab", icon: <FaFileMedicalAlt />, path: null, bg: "password2" },
    { label: "Procedures", icon: <FaProcedures />, path: null, bg: "faq2" },
    { label: "Billing", icon: <FaFileInvoiceDollar />, path: null, bg: "reports2" },
    { label: "Insurance", icon: <FaFileInvoiceDollar />, path: null, bg: "websites2" },
    { label: "Staff", icon: <FaUsers />, path: null, bg: "password2" },
    { label: "Inventory", icon: <FaWarehouse />, path: null, bg: "faq2" },
    { label: "Analytics", icon: <FaChartBar />, path: null, bg: "reports2" },
  ];

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen]);

  const handleCardClick = (path) => {
    if (path) navigate(path);
  };

  return (
    <div className={`icons-wrapper ${isDrawerOpen ? "drawer-open" : ""}`}>
      <Sidebar sidebarRef={sidebarRef} onClose={() => setIsDrawerOpen(false)} />
      <main className="icons-main-content">
        <Navbar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />

        <section className="small-card-container">
          {iconCards.map(({ label, icon, path, bg }, index) => (
            <div
              key={index}
              className={`small-icon-card ${bg}`}
              onClick={() => handleCardClick(path)}
              style={{ cursor: path ? "pointer" : "default" }}
              title={label}
              role={path ? "button" : undefined}
              tabIndex={path ? 0 : -1}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && path) {
                  handleCardClick(path);
                }
              }}
            >
              <div className="small-icon">{icon}</div>
              <span className="small-icon-label">{label}</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Icons;
