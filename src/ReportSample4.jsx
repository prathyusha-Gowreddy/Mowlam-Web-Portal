import React, { useMemo, useRef, useState } from "react";
import "./ReportPwerBi.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function ReportSample4() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cacheBust, setCacheBust] = useState(Date.now());
  const sidebarRef = useRef(null);

  // Power BI report URLs
  // const reportUrl = "https://app.powerbi.com/view?r=eyJrIjoiNjUwY2E1NTQtNTY2NS00ZTg4LWEyNWEtNWU4YThhMThkMzg4IiwidCI6IjVmNDkzNDk3LWE0YzgtNDA4MC05NWVmLTBjMGZlY2RkMjg5MCIsImMiOjl9&pageName=919d9cc5dec4e95223a8";
  const reportUrl = "";
  // Refresh the iframe only, not the whole app
  const iframeSrc = useMemo(() => {
    if (!reportUrl || reportUrl.trim() === "") return null;
    const sep = reportUrl.includes("?") ? "&" : "?";
    return `${reportUrl}${sep}v=${cacheBust}`;
  }, [reportUrl, cacheBust]);

  const refreshReport = () => setCacheBust(Date.now());
  
  const hasReport = reportUrl && reportUrl.trim() !== "";

  return (
    <div className={`reporting-wrapper ${isDrawerOpen ? "drawer-open" : ""}`}>
      <Sidebar
        sidebarRef={sidebarRef}
        onClose={() => setIsDrawerOpen(false)}
      />

      <main className="reporting-main-content">
        <Navbar
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />

        <div className="content-area">
          <div className="content-area-inner">
            <div className="content-header">
              <h2 className="content-title">Customer Order Tracking and RDD Monitoring Report</h2>

              {hasReport && (
                <button
                  onClick={refreshReport}
                  className="btn btn-refresh"
                  aria-label="Refresh Report"
                >
                  Refresh Report
                </button>
              )}
            </div>

            <div className="report-frame">
              {hasReport && iframeSrc ? (
                <iframe
                  title="Customer Order Tracking and RDD Monitoring Report"
                  src={iframeSrc}
                  frameBorder="0"
                  className="report-iframe"
                  allowFullScreen
                />
              ) : (
                <div className="no-report-container">
                  <div className="no-report-icon">📊</div>
                  <h3 className="no-report-title">No Report Available</h3>
                  <p className="no-report-message">
                    The report URL has not been configured. Please contact your administrator to set up the report link.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

