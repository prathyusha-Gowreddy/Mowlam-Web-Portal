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
      navigate("/");
    } else {
      instance.logoutRedirect();
    }
  };
  const powerBIUrl =
    "https://app.powerbi.com/groups/me/dashboards/1daa8191-2334-41d5-bcf1-cd60d7d459e4?experience=power-bi";

  // const handleReportingClick = () => {
  //   // Open Power BI dashboard in a new tab
  //   window.open(powerBIUrl, "_blank");
  // };

  // New state for reporting submenu open/close
  const [reportingOpen, setReportingOpen] = useState(false);

  const toggleReporting = () => {
    setReportingOpen(!reportingOpen);
  };

  return (
    <aside ref={sidebarRef} className="sidebar">
      <div className="sidebar-top">
        <img src="/logo.png" alt="Logo" className="sidebar-logo-img" />
        <span className="sidebar-close" onClick={onClose}>
          ×
        </span>
      </div>

      <nav className="sidebar-menu">
        <div className="menu-item">
          <FaHome />
          <span className="label">Home</span>
        </div>

        {/* Reporting Menu with Submenu */}
        <div
          className="menu-item reporting-header"
          onClick={toggleReporting}
          style={{ cursor: "pointer" }}
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
            >
              <FaChartBar />
              <span>Open Power BI Dashboard</span>
            </div>
            {/* Clinical Reports */}
            <div className="submenu-item">
  <FaProcedures />
  <span onClick={() => navigate("/powerBIReport")}>
    Admission / Discharge
  </span>
</div>

            <div className="submenu-item">
              <FaFileMedicalAlt />
              <span onClick={() => navigate("/reports")}>Lab & Diagnostic</span>
            </div>
            <div className="submenu-item">
              <FaProcedures />
              <span>Operative / Procedure</span>
            </div>

            {/* Financial Reports */}
            <div className="submenu-item">
              <FaFileInvoiceDollar />
              <span>Billing Reports</span>
            </div>
            <div className="submenu-item">
              <FaFileInvoiceDollar />
              <span>Insurance Claims</span>
            </div>

            {/* Administrative Reports */}
            <div className="submenu-item">
              <FaUsers />
              <span>Staff Attendance</span>
            </div>
            <div className="submenu-item">
              <FaWarehouse />
              <span>Inventory Reports</span>
            </div>
          </div>
        )}

        <div className="menu-item">
          <FaGlobe />
          <span className="label">Applications</span>
        </div>

        {/* Added new sidebar items */}
        <div className="menu-item">
          <FaMoneyCheckAlt />
          <span className="label">Payroll</span>
        </div>
        <div className="menu-item">
          <FaBook />
          <span className="label">Learning / Training</span>
        </div>
        <div className="menu-item">
          <FaHeadset />
          <span className="label">Support</span>
        </div>

        {/* Logout Option */}
        <div className="menu-item logout" onClick={handleLogout}>
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
