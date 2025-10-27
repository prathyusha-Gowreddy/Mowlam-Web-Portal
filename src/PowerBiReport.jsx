import React from "react";

const PowerBIReport = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        title="Power BI Report"
        src="https://app.powerbi.com/view?r=" // Replace with your actual report URL
        frameBorder="0"
        style={{ width: "100%", height: "100%" }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default PowerBIReport;
