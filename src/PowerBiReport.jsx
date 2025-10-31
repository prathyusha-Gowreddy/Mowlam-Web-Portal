import React from "react";

const PowerBIReport = () => {
  // Replace with your actual report URL or get it from props/context
  const reportUrl = ""; // "https://app.powerbi.com/view?r=YOUR_REPORT_ID";
  
  const hasReport = reportUrl && reportUrl.trim() !== "";

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {hasReport ? (
        <iframe
          title="Power BI Report"
          src={reportUrl}
          frameBorder="0"
          style={{ width: "100%", height: "100%" }}
          allowFullScreen
        />
      ) : (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "2rem",
          textAlign: "center",
          color: "#666"
        }}>
          <div style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            opacity: 0.5
          }}>📊</div>
          <h3 style={{
            color: "#2c3e50",
            marginBottom: "0.5rem",
            fontSize: "1.5rem"
          }}>No Report Available</h3>
          <p style={{
            fontSize: "1rem",
            maxWidth: "500px",
            lineHeight: "1.6"
          }}>
            The report URL has not been configured. Please contact your administrator to set up the report link.
          </p>
        </div>
      )}
    </div>
  );
};

export default PowerBIReport;
