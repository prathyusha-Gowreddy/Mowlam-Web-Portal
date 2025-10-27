import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Homepage from './Homepage';
import Applications from './Applications';
import Reporting from './Reporting';
import Reportviewer from './Reportviewer';
import WebsiteViewer from './WebsiteViewer';
import { useIsAuthenticated } from "@azure/msal-react";
import IconGrid from './Icons';
import PowerBIReport from './PowerBiReport';
import Reports from './ReportPwerBi';

// ✅ Supports both MSAL and Local Login
function ProtectedRoute({ children }) {
  const isAuthenticated = useIsAuthenticated();
  const isLocalUser = sessionStorage.getItem("localUserLoggedIn") === "true";
  return (isAuthenticated || isLocalUser) ? children : <Navigate to="/login" replace />;
}

function App() {
  const isAuthenticated = useIsAuthenticated();
  const isLocalUser = sessionStorage.getItem("localUserLoggedIn") === "true";
  const isLoggedIn = isAuthenticated || isLocalUser;

  return (
    <Routes>
      {/* Default route: redirect based on login status */}
      <Route path="/" element={<Navigate to={isLoggedIn ? "/homepage" : "/login"} replace />} />

      {/* Login page: if already logged in, go to homepage */}
      <Route path="/login" element={isLoggedIn ? <Navigate to="/homepage" replace /> : <Login />} />

      {/* Protected Routes */}
      <Route path="/homepage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
      <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
      <Route path="/reporting" element={<ProtectedRoute><Reporting /></ProtectedRoute>} />
      <Route path="/report-viewer" element={<ProtectedRoute><Reportviewer /></ProtectedRoute>} />
      <Route path="/website-viewer" element={<ProtectedRoute><WebsiteViewer /></ProtectedRoute>} />
      <Route path="/icons" element={<ProtectedRoute><IconGrid/></ProtectedRoute>}></Route>
      <Route path="/powerBIReport" element={<ProtectedRoute><PowerBIReport/></ProtectedRoute>}></Route>
      <Route path="/reports" element={<ProtectedRoute><Reports/></ProtectedRoute>}></Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
