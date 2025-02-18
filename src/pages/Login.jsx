import React, { useState } from "react";


export default function Login() {
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { employeeID, password, rememberMe });
  };

  return (
    <div className="login-container"> 
      <div className="login-box">
        <div className="profile-icon"></div>
        <h2 className="title">Get Started</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Employee ID"
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <button type="submit" className="sign-in-btn">
            Sign In
          </button>
        </form>
        <p className="forgot-password">
          <a href="#">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
}
