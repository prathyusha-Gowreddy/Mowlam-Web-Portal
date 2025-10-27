import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Reporting.css";

function Reporting() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const reportCards = [
    {
      title: "Rehabilitation Activity",
      reportUrl:
        "https://app.powerbi.com/reportEmbed?reportId=4769ada1-522e-4d09-8171-2b2758be3860&autoAuth=true&ctid=6f67b6e8-c2df-4762-8c6a-aefcb6a50973",
      bg: "reports2",
    },
    {
      title: "Direct & Indirect Interventions",
      reportUrl:
        "https://app.powerbi.com/reportEmbed?reportId=4769ada1-522e-4d09-8171-2b2758be3860&bookmarkGuid=c319dc4fc3470da06d41&autoAuth=true&ctid=6f67b6e8-c2df-4762-8c6a-aefcb6a50973",
      bg: "websites2",
    },
    {
      title: "Patient Outcomes",
      reportUrl:
        "https://app.powerbi.com/reportEmbed?reportId=4769ada1-522e-4d09-8171-2b2758be3860&bookmarkGuid=6d4c0d7c43039c4c3625&autoAuth=true&ctid=6f67b6e8-c2df-4762-8c6a-aefcb6a50973",
      bg: "password2",
    },
    {
      title: "Patient Experience",
      reportUrl:
        "https://app.powerbi.com/reportEmbed?reportId=4769ada1-522e-4d09-8171-2b2758be3860&bookmarkGuid=078d422aa06b90b01b92&autoAuth=true&ctid=6f67b6e8-c2df-4762-8c6a-aefcb6a50973",
      bg: "faq2",
    },
    {
      title: "Staffing Analysis",
      reportUrl:
        "https://app.powerbi.com/reportEmbed?reportId=4769ada1-522e-4d09-8171-2b2758be3860&bookmarkGuid=078d422aa06b90b01b92&autoAuth=true&ctid=6f67b6e8-c2df-4762-8c6a-aefcb6a50973",
      bg: "faq2",
    },
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

  const handleCardClick = (title, reportUrl) => {
    // encode params for URL
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(reportUrl);

    navigate({
      pathname: "/report-viewer",
      search: `?title=${encodedTitle}&reportUrl=${encodedUrl}`,
      state: { title, reportUrl },
    });
  };

  return (
    <div className={`reporting-wrapper ${isDrawerOpen ? "drawer-open" : ""}`}>
      <Sidebar sidebarRef={sidebarRef} onClose={() => setIsDrawerOpen(false)} />
      <main className="reporting-main-content">
        <Navbar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
        <section className="reporting-cards2">
          {reportCards.map((card, index) => (
            <div
              key={index}
              className="card2"
              data-bg={card.bg}
              onClick={() => handleCardClick(card.title, card.reportUrl)}
            >
              <span>{card.title}</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Reporting;
