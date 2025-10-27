import React, { useMemo, useRef, useState } from "react";
// ⬇️ Update these paths to your actual components

import "./ReportPwerBi.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Reports() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cacheBust, setCacheBust] = useState(Date.now());
  const sidebarRef = useRef(null);

  // Prefer an env var for easy swapping across environments
  const reportUrl =
    import.meta.env.VITE_PBI_PTW_URL ||
    "https://playground.powerbi.com/sampleReportEmbed" ;
    // "https://app.powerbi.com/groups/cff51c1d-12a0-45f6-b475-a52978b1e551/reports/99b6dddf-0958-4819-83e9-71a997dbbe77/9f230f0eb9b81116ca04?bookmarkGuid=9a122692-af05-4fba-b9ed-1ab9bfd94afa&bookmarkUsage=1&ctid=2b6c600f-b6cb-4329-af3b-1b32c62c440f&portalSessionId=8f9ee8db-31c7-43d7-a456-0bd9d13d7c64&fromEntryPoint=export";
    // "https://app.powerbi.com/groups/cff51c1d-12a0-45f6-b475-a52978b1e551/reports/a335a3a6-748c-4a1a-997f-e5dddf47f4bb/9f230f0eb9b81116ca04?experience=power-bi";
    // "https://playground.powerbi.com/sampleReportEmbed"; // Replace with your Publish-to-Web URL

  // Refresh the iframe only, not the whole app
  const iframeSrc = useMemo(() => {
    const sep = reportUrl.includes("?") ? "&" : "?";
    return `${reportUrl}${sep}v=${cacheBust}`;
  }, [reportUrl, cacheBust]);

  const refreshReport = () => setCacheBust(Date.now());

  return (
    <div className={`reporting-wrapper ${isDrawerOpen ? "drawer-open" : ""}`}>
      <Sidebar       sidebarRef={sidebarRef}
        onClose={() => setIsDrawerOpen(false)}
      />

      <main className="reporting-main-content">
        <Navbar
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />

        <div className="content-area">
          <div className="content-header">
            <h2 className="content-title">Power BI Reports</h2>

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
              title="Power BI Report"
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

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import "./ReportPwerBi.css";
// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";
// import { BrowserQRCodeReader } from "@zxing/browser";

// export default function Reports() {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [cacheBust, setCacheBust] = useState(Date.now());
//   const [decodedUrl, setDecodedUrl] = useState("");
//   const [error, setError] = useState("");
//   const sidebarRef = useRef(null);

//   // Your QR image in /public
//   const qrSrc = "/healthReport.jpg";

//   // Optional fallback if QR decoding fails
//   const fallbackUrl = import.meta.env.VITE_PBI_PTW_URL || "";

//   useEffect(() => {
//     const reader = new BrowserQRCodeReader();
//     const absoluteImgUrl = new URL(qrSrc, window.location.origin).toString();

//     reader
//       .decodeFromImageUrl(absoluteImgUrl)
//       .then((result) => {
//         const text = result.getText ? result.getText() : String(result);
//         setDecodedUrl(text);
//       })
//       .catch((e) => {
//         console.error("QR decode failed:", e);
//         setError("Couldn't read the QR image. Using fallback (if set).");
//         if (fallbackUrl) setDecodedUrl(fallbackUrl);
//       });
//   }, [qrSrc, fallbackUrl]);

//   const reportUrl = decodedUrl; // comes from QR (or fallback)
//   const iframeSrc = useMemo(() => {
//     if (!reportUrl) return "";
//     const sep = reportUrl.includes("?") ? "&" : "?";
//     return `${reportUrl}${sep}v=${cacheBust}`;
//   }, [reportUrl, cacheBust]);

//   const refreshReport = () => setCacheBust(Date.now());

//   return (
//     <div className={`reporting-wrapper ${isDrawerOpen ? "drawer-open" : ""}`}>
//       <Sidebar sidebarRef={sidebarRef} onClose={() => setIsDrawerOpen(false)} />

//       <main className="reporting-main-content">
//         <Navbar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />

//         <div className="content-area">
//           <div className="content-header">
//             <h2 className="content-title">Power BI Reports</h2>

//             <div className="actions">
//               <button
//                 onClick={refreshReport}
//                 className="btn btn-refresh"
//                 aria-label="Refresh Report"
//                 disabled={!reportUrl}
//               >
//                 Refresh Report
//               </button>

//               <a
//                 href={reportUrl || "#"}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="btn btn-open"
//                 title="Open report in a new tab"
//                 onClick={(e) => !reportUrl && e.preventDefault()}
//               >
//                 Open Report
//               </a>
//             </div>
//           </div>

//           {error && (
//             <div className="notice warning" role="alert">
//               {error}
//             </div>
//           )}

//           <div className="content-row">
//             <div className="report-frame">
//               {!iframeSrc ? (
//                 <div className="loading-placeholder">
//                   Decoding QR… (ensure /public/healthReport.jpg encodes a valid embed URL)
//                 </div>
//               ) : (
//                 <iframe
//                   title="Power BI Report"
//                   src={iframeSrc}
//                   frameBorder="0"
//                   style={{ width: "100%", height: "100%" }}
//                   allowFullScreen
//                 />
//               )}
//             </div>

//             <aside className="qr-pane">
//               <h4>Scan to view on mobile</h4>
//               <a
//                 href={reportUrl || "#"}
//                 target="_blank"
//                 rel="noreferrer"
//                 title="Open report in a new tab"
//                 onClick={(e) => !reportUrl && e.preventDefault()}
//               >
//                 <img
//                   src={qrSrc}
//                   alt="QR code to open this Power BI report"
//                   className="qr-image"
//                 />
//               </a>

//               <div className="qr-links">
//                 <a href={qrSrc} download="report-qr.jpg" className="link">
//                   Download QR
//                 </a>
//                 <button
//                   onClick={async () => {
//                     if (!reportUrl) return alert("No URL yet—QR still decoding.");
//                     try {
//                       await navigator.clipboard.writeText(reportUrl);
//                       alert("Report link copied to clipboard!");
//                     } catch {
//                       alert("Could not copy the link. Please copy it manually.");
//                     }
//                   }}
//                   className="link link-button"
//                 >
//                   Copy Report Link
//                 </button>
//               </div>

//               <p className="qr-hint">
//                 The QR should encode a <b>Publish to web</b> URL
//                 (<code>https://app.powerbi.com/view?r=...</code>) or a
//                 <b> Secure Embed</b> URL
//                 (<code>https://app.powerbi.com/reportEmbed?reportId=...&groupId=...</code>).
//                 Workspace URLs (<code>/groups/.../reports/...</code>) won’t embed in iframes.
//               </p>
//             </aside>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }