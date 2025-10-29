import React, { useMemo, useRef, useState, useEffect } from "react";
import "./ReportPwerBi.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function ReportSample3() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cacheBust, setCacheBust] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const sidebarRef = useRef(null);

  // Power BI report URL - Replace with your actual Power BI report embed URL
  const reportUrl = "https://app.powerbi.com/view?r=eyJrIjoiYzYzYjY2YjUtYjYxNS00YjYxLTg2YjUtZGMzYjY2YjY2YjY2IiwidCI6IjY2YjY2YjY2LTY2YjYtNGY2Yy1iNmY2LTY2YjY2YjY2YjY2YyJ9";
  
  const iframeSrc = useMemo(() => {
    const sep = reportUrl.includes("?") ? "&" : "?";
    return `${reportUrl}${sep}v=${cacheBust}`;
  }, [reportUrl, cacheBust]);

  const refreshReport = () => {
    setIsLoading(true);
    setHasError(false);
    setCacheBust(Date.now());
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setHasError(true);
      }
    }, 15000); // 15 second timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

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
            {isLoading && (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading HR Analytics report...</p>
              </div>
            )}
            
            {hasError && !isLoading && (
              <div className="error-container">
                <div className="error-icon">⚠️</div>
                <h3>Unable to load report</h3>
                <p>The Power BI report could not be loaded.</p>
                <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "10px" }}>
                  Please check:
                </p>
                <ul style={{ textAlign: "left", color: "#666" }}>
                  <li>Report URL is correct</li>
                  <li>Report has public sharing enabled</li>
                  <li>Network connection is active</li>
                </ul>
                <button onClick={refreshReport} className="btn btn-refresh" style={{ marginTop: "15px" }}>
                  Retry
                </button>
              </div>
            )}

            <iframe
              title="HR Analytics Report"
              src={iframeSrc}
              frameBorder="0"
              style={{ 
                width: "100%", 
                height: "100%",
                display: isLoading || hasError ? "none" : "block"
              }}
              allowFullScreen
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

