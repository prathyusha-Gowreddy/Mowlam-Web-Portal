import React, { useState, useEffect, useCallback } from "react";
import "./Login.css";
import ChatBot from "./Chatbot";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { apiCall, API_ENDPOINTS } from "./api/config";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("neutral");
  const [errorMessage, setErrorMessage] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isLoading, setIsLoading] = useState(false);
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

  // Function to validate credentials via API (validation only, no login)
  const validateCredentials = useCallback(async (userValue, passValue) => {
    // Use provided values or current state
    const user = userValue !== undefined ? userValue : username.trim();
    const pass = passValue !== undefined ? passValue : password;

    // Don't validate if both are empty
    if (!user && !pass) {
      setErrorMessage("");
      setStatus("neutral");
      return;
    }

    try {
      // Call the login API to validate credentials
      // This is just for validation - we don't store tokens or log in
      const response = await apiCall(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        body: {
          username: user || "",
          password: pass || "",
        },
      });

      // If validation succeeds (no error), clear any error messages
      // Note: We don't store tokens here - only validate
      if (response.token || response.accessToken || response.success || response.data) {
        setErrorMessage("");
        setStatus("neutral");
      }
    } catch (error) {
      // Extract error message from API response
      // The apiCall function throws an Error with the message from the API
      let apiErrorMessage = "Invalid credentials. Please check your username and password.";
      
      if (error.message) {
        apiErrorMessage = error.message;
      }
      
      setStatus("error");
      setErrorMessage(apiErrorMessage);
    }
  }, [username, password]);

  // Real-time API-based validation with debouncing for username
  useEffect(() => {
    // Clear previous timeout
    const timeoutId = setTimeout(() => {
      // Validate from the first character typed (index 0)
      if (username.trim().length > 0) {
        validateCredentials(username.trim(), password);
      } else if (username.trim().length === 0 && password.length === 0) {
        // Clear error if both fields are empty
        setErrorMessage("");
        setStatus("neutral");
      }
    }, 500); // Debounce delay of 500ms for faster feedback

    return () => clearTimeout(timeoutId);
  }, [username, password, validateCredentials]);

  // Real-time API-based validation with debouncing for password
  useEffect(() => {
    // Clear previous timeout
    const timeoutId = setTimeout(() => {
      // Validate from the first character typed (index 0)
      if (password.length > 0) {
        validateCredentials(username.trim(), password);
      } else if (username.trim().length === 0 && password.length === 0) {
        // Clear error if both fields are empty
        setErrorMessage("");
        setStatus("neutral");
      }
    }, 500); // Debounce delay of 500ms for faster feedback

    return () => clearTimeout(timeoutId);
  }, [password, username, validateCredentials]);

  const handleSignIn = async () => {
    if (!username.trim() || !password.trim()) {
      setStatus("error");
      setErrorMessage("Please enter both username and password.");
      return;
    }

    setIsLoading(true);
    setStatus("neutral");
    setErrorMessage("");

    try {
      // API call to backend login endpoint
      const response = await apiCall(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        body: {
          username: username.trim(),
          password: password,
        },
      });

      // Handle successful login
      if (response.token || response.accessToken || response.success || response.data) {
        setStatus("success");
        
        // Store authentication token if provided
        const token = response.token || response.accessToken || response.data?.token;
        if (token) {
          sessionStorage.setItem("authToken", token);
        }
        
        // Store user information
        sessionStorage.setItem("localUserLoggedIn", "true");
        const loggedInUsername = response.username || response.data?.username || response.user?.username || username;
        sessionStorage.setItem("loggedInUsername", loggedInUsername);
        
        // Extract and store user role from response
        // Try multiple possible locations for role in the response
        const userRole = response.role || 
                        response.data?.role || 
                        response.user?.role || 
                        response.data?.user?.role ||
                        response.userRole;
        
        if (userRole) {
          sessionStorage.setItem("userRole", userRole);
        }
        
        // Store additional user data if provided
        const userData = response.user || response.data?.user || {};
        if (Object.keys(userData).length > 0) {
          sessionStorage.setItem("userData", JSON.stringify(userData));
        }

        setTimeout(() => {
          navigate("/homepage", { replace: true });
        }, 1500);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error.message || "Invalid credentials. Please check your username and password."
      );
      setTimeout(() => setStatus("neutral"), 2000);
    } finally {
      setIsLoading(false);
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
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </div>
        <ChatBot />
      </div>
    </div>
  );
}

export default Login;
