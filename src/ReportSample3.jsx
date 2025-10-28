import React, { useMemo, useRef, useState } from "react";
import "./ReportPwerBi.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function ReportSample3() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cacheBust, setCacheBust] = useState(Date.now());
  const sidebarRef = useRef(null);

  // Power BI report URLs
  const reportUrl = "https://playground.powerbi.com/sampleReportEmbed?report=hrAnalytics";

  // Refresh the iframe only, not the whole app
  const iframeSrc = useMemo(() => {
    const sep = reportUrl.includes("?") ? "&" : "?";
    return `${reportUrl}${sep}v=${cacheBust}`;
  }, [reportUrl, cacheBust]);

  const refreshReport = () => setCacheBust(Date.now());

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
          <div className="content-header">
            <h2 className="content-title">HR Analytics</h2>

            <button
              onClick={refreshReport}
              className="btn btn-refresh"
              aria-label="Refresh Report"
            >
              Refresh Report
            </button>
          </div>

          <div className="report-frame">
            <iframe
              title="Sample Report 2"
              src={iframeSrc}
              frameBorder="0"
              style={{ width: "100%", height: "100%" }}
              allowFullScreen
            />
          </div>
        </div>
      </main>
    </div>
  );
}

