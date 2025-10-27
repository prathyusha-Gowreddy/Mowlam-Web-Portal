import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("neutral"); // "neutral", "success", "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

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
        window.location.href = "/homepage";
      }, 1500);
    } else {
      setStatus("error");
      setErrorMessage("❌ Invalid credentials. Please try again!");
      setTimeout(() => setStatus("neutral"), 2000);
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0.5, y: 0.5 }); // reset to center
  };

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  // Eye and shape movement calculations
  const eyeOffsetX = (mousePos.x - 0.5) * 15;
  const eyeOffsetY = (mousePos.y - 0.5) * 15;
  const bodyTiltX = (mousePos.x - 0.5) * 20;
  const bodyTiltY = (mousePos.y - 0.5) * -20;

  return (
    <div className="login-page-layout">
      {/* Left side with moving shapes */}
      <div
        className={`login-left-section ${status}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
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
        <div className="login-box">
          <h2 className="login-title">Welcome back!</h2>

          {errorMessage && <div className="login-error-message">{errorMessage}</div>}

          <label htmlFor="username">Email</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className={`sign-in ${isFormValid ? "active" : ""}`}
            onClick={handleSignIn}
            disabled={!isFormValid}
          >
            Log In
          </button>

          <button className="google-login">
            <i className="fab fa-google"></i> Log in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
