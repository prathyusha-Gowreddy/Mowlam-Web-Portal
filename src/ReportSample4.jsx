import React, { useMemo, useRef, useState } from "react";
import "./ReportPwerBi.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function ReportSample4() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cacheBust, setCacheBust] = useState(Date.now());
  const sidebarRef = useRef(null);

  // Power BI report URLs
  const reportUrl = "https://app.powerbi.com/reportEmbed?reportId=36621bde-4614-40df-8e08-79481d767bcb&groupId=dfbfe8ab-b93b-4345-8a43-655697ff36dd&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQifQ%3d%3d";

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
            <h2 className="content-title">Sales Marketing</h2>

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
              title="Sample Report 3"
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

