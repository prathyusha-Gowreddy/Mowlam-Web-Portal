import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);
const root = createRoot(document.getElementById('root'));

// Show temporary loading UI
root.render(
  <div style={{ padding: '2rem', fontSize: '1.2rem' }}>
    Loading authentication...
  </div>
);

async function main() {
  try {
    // Required in MSAL v3+
    await msalInstance.initialize();

    // Handles MSAL redirect login (if used)
    const response = await msalInstance.handleRedirectPromise();
    if (response) {
      console.log("✅ MSAL Login Response:", response);
    }

    // Render the app once MSAL is ready
    root.render(
      <StrictMode>
        <MsalProvider instance={msalInstance}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MsalProvider>
      </StrictMode>
    );
  } catch (error) {
    console.error("❌ MSAL Initialization Error:", error);
    root.render(
      <div style={{ padding: '2rem', color: 'red' }}>
        <h2>MSAL Initialization Error</h2>
        <pre>{error.message}</pre>
      </div>
    );
  }
}

main();
