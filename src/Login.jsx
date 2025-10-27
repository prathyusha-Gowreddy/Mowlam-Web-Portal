import React, { useState, useEffect } from "react";
import "./Login.css";
import ChatBot from "./Chatbot";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("neutral");
  const [errorMessage, setErrorMessage] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const navigate = useNavigate();
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    const localUser = sessionStorage.getItem("localUserLoggedIn") === "true";

    if (isAuthenticated || localUser) {
      navigate("/homepage", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Global mouse tracking for eye movement
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  const validUsers = [
    { username: "Ashok_MLHC", password: "MLHC@2025" },
    { username: "Ravi_MLHC", password: "MLHC@2025" },
  ];

  const handleSignIn = () => {
    const matchedUser = validUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      setStatus("success");
      setErrorMessage("");
      sessionStorage.setItem("localUserLoggedIn", "true");
      sessionStorage.setItem("loggedInUsername", matchedUser.username);
      setTimeout(() => {
        sessionStorage.setItem("localUserLoggedIn", "true");
        navigate("/homepage", { replace: true });
      }, 1500);
    } else {
      setStatus("error");
      setErrorMessage("❌ Invalid credentials. Please check your username and password.");
      setTimeout(() => setStatus("neutral"), 2000);
    }
  };

  const handleMSLogin = () => {
    instance.loginRedirect();
  };

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  // Eye and shape movement calculations
  const eyeOffsetX = (mousePos.x - 0.5) * 15;
  const eyeOffsetY = (mousePos.y - 0.5) * 15;
  const bodyTiltX = (mousePos.x - 0.5) * 20;
  const bodyTiltY = (mousePos.y - 0.5) * -20;

  return (
    <div className="login-page-layout">
      {/* Left side with animated emojis */}
      <div className={`login-left-section ${status}`}>
        <div
          className="shapes-container"
          style={{
            transform: `rotateY(${bodyTiltX}deg) rotateX(${bodyTiltY}deg)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          {/* Orange semicircle */}
          <div className="shape shape1">
            <div className="eyes">
              <div
                className="eye"
                style={{
                  transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`,
                }}
              ></div>
              <div
                className="eye"
                style={{
                  transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`,
                }}
              ></div>
            </div>
          </div>

          {/* Black rectangle */}
          <div className="shape shape2">
            <div className="eyes">
              <div
                className="eye small"
                style={{
                  transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`,
                }}
              ></div>
              <div
                className="eye small"
                style={{
                  transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`,
                }}
              ></div>
            </div>
          </div>

          {/* Purple rectangle */}
          <div className="shape shape3">
            <div className="eyes">
              <div
                className="eye"
                style={{
                  transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`,
                }}
              ></div>
              <div
                className="eye"
                style={{
                  transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`,
                }}
              ></div>
            </div>
          </div>

          {/* Yellow block */}
          <div className="shape shape4">
            <div className="eyes">
              <div
                className="eye small"
                style={{
                  transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`,
                }}
              ></div>
              <div
                className="eye small"
                style={{
                  transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="login-right-section">
        <img src="/logo.png" alt="Mowlam Logo" className="mowlam-logo" />
        <div className="login-box login-box-centered">
          <h2 className="login-title">Welcome to Mowlam Healthcare</h2>

          <button className="ms-login" onClick={handleMSLogin}>
            <i className="fab fa-windows"></i> Login with Office 365
          </button>

          <p className="sub-text">
            Don't have an Office 365 login? <br /> Login with your username.
          </p>

          {errorMessage && (
            <div className="login-error-message">{errorMessage}</div>
          )}

          <label htmlFor="username">Username *</label>
          <input
            id="username"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password *</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className={`sign-in ${isFormValid ? "active" : ""}`}
            onClick={handleSignIn}
            disabled={!isFormValid}
          >
            Sign In
          </button>
        </div>
        <ChatBot />
      </div>
    </div>
  );
}

export default Login;
