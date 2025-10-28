import React, { useState } from "react";
import {
  FaHome,
  FaChartBar,
  FaGlobe,
  FaMoneyCheckAlt,
  FaBook,
  FaHeadset,
  FaPowerOff,
  FaProcedures,
  FaFileMedicalAlt,
  FaFileInvoiceDollar,
  FaUsers,
  FaWarehouse,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import "./Sidebar.css";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

function Sidebar({ sidebarRef, onClose }) {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const isLocalUser = sessionStorage.getItem("localUserLoggedIn") === "true";

  const handleLogout = () => {
    if (isLocalUser) {
      sessionStorage.removeItem("localUserLoggedIn");
      sessionStorage.removeItem("loggedInUsername");
      navigate("/Logout");
    } else {
      instance.logoutRedirect();
    }
  };

  const powerBIUrl =
    "https://app.powerbi.com/groups/me/dashboards/1daa8191-2334-41d5-bcf1-cd60d7d459e4?experience=power-bi";

  const [reportingOpen, setReportingOpen] = useState(false);
  const toggleReporting = () => setReportingOpen(!reportingOpen);

  return (
    <aside ref={sidebarRef} className="sidebar">
      <div className="sidebar-top">
        <img src="/logo.png" alt="Logo" className="sidebar-logo-img" />
        <span className="sidebar-close" onClick={onClose}>×</span>
      </div>

      <nav className="sidebar-menu">
        <div className="menu-item" title="Go to Home">
          <FaHome />
          <span className="label">Home</span>
        </div>

        <div
          className="menu-item reporting-header"
          onClick={toggleReporting}
          style={{ cursor: "pointer" }}
          title="View Reporting Options"
        >
          <FaChartBar />
          <span className="label">Reporting</span>
          <span style={{ marginLeft: "auto" }}>
            {reportingOpen ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </div>

        {reportingOpen && (
          <div className="reporting-submenu">
            <div
              className="submenu-item"
              onClick={() => window.open(powerBIUrl, "_blank")}
              style={{ cursor: "pointer" }}
              title="Open Power BI Dashboard"
            >
              <FaChartBar />
              <span>Open Power BI Dashboard</span>
            </div>

            <div className="submenu-item" title="Admission and Discharge Reports">
              <FaProcedures />
              <span onClick={() => navigate("/powerBIReport")}>
                Admission / Discharge
              </span>
            </div>

            <div className="submenu-item" title="Lab and Diagnostic Reports">
              <FaFileMedicalAlt />
              <span onClick={() => navigate("/reports")}>Lab & Diagnostic</span>
            </div>
            <div className="submenu-item" onClick={() => navigate("/report-sample1")} title="Customer Profitability Report">
              <FaChartBar />
              <span>Customer Profitability</span>
            </div>
            <div className="submenu-item" onClick={() => navigate("/report-sample2")} title="Sample Report Embed">
              <FaChartBar />
              <span>Sample Report Embed</span>
            </div>
            <div className="submenu-item" onClick={() => navigate("/report-sample3")} title="HR Analytics Report">
              <FaChartBar />
              <span>Hr Analytics</span>
            </div>
            <div className="submenu-item" onClick={() => navigate("/report-sample4")} title="Sales Marketing Report">
              <FaChartBar />
              <span>Sales Marketing</span>
            </div>
            <div className="submenu-item" title="Operative and Procedure Reports">
              <FaProcedures />
              <span>Operative / Procedure</span>
            </div>

            <div className="submenu-item" title="Billing Reports">
              <FaFileInvoiceDollar />
              <span>Billing Reports</span>
            </div>

            <div className="submenu-item" title="Insurance Claims Reports">
              <FaFileInvoiceDollar />
              <span>Insurance Claims</span>
            </div>

            <div className="submenu-item" title="Staff Attendance Reports">
              <FaUsers />
              <span>Staff Attendance</span>
            </div>

            <div className="submenu-item" title="Inventory Reports">
              <FaWarehouse />
              <span>Inventory Reports</span>
            </div>
          </div>
        )}

        <div className="menu-item" title="View Applications">
          <FaGlobe />
          <span className="label">Applications</span>
        </div>

        <div className="menu-item" title="Payroll Information">
          <FaMoneyCheckAlt />
          <span className="label">Payroll</span>
        </div>

        <div className="menu-item" title="Learning and Training Resources">
          <FaBook />
          <span className="label">Learning / Training</span>
        </div>

        <div className="menu-item" title="Support and Help">
          <FaHeadset />
          <span className="label">Support</span>
        </div>

        <div className="menu-item logout" onClick={handleLogout} title="Logout">
          <FaPowerOff />
          <span className="label">Logout</span>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-social">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <p className="copyright">© Mowlam Healthcare 2025</p>
      </div>
    </aside>
  );
}

export default Sidebar;