import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Alert } from 'antd';

export default function Login() {
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {

    axios.post("http://localhost:5001/api/user/login", {
      email : employeeID,
      // email : "admin@gmail.com",
      password,
      rememberMe,
    })
    .then((res) => {
      console.log(res.data.data);
      dispatch(loginSuccess(res.data.data))
      navigate('/dashboard', { replace: true });
    }
    )
    .catch((err) => {
      console.log(err);
      setError("Invalid Credentials");
    } 
    );
  };

  return (
    <div className="login-container"> 
      <div className="login-box">
        <div className="profile-icon"></div>
        <h2 className="title">Get Started</h2>
       {error && <Alert message={error} type="error" />}
        <div className="loginForm" >
          <input
            type="text"
            placeholder="Employee ID/ Email"
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

          <button onClick={handleLogin} className="sign-in-btn">
            Sign In
          </button>
        </div>
        <p className="forgot-password">
          <a href="#">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
}
