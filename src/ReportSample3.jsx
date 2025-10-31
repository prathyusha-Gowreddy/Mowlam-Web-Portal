import React, { useMemo, useRef, useState } from "react";
import "./ReportPwerBi.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function ReportSample3() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cacheBust, setCacheBust] = useState(Date.now());
  const sidebarRef = useRef(null);

  // Power BI report URLs
  const reportUrl = "https://app.powerbi.com/view?r=eyJrIjoiZTk1NmM2MTAtMDc5NS00MzM3LThmM2UtNjhmMzc4ZDAzYmI3IiwidCI6ImEyNTg2YjliLWY4NjctNGIzYy05MzYzLTViNDM1YzVkYmM0NSIsImMiOjh9&pageName=ReportSectiona15dd370f06576987a76";
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
              <h2 className="content-title">OutdoorFusion Sales Overview</h2>

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
                  title="OutdoorFusion Sales Overview"
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

