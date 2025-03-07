import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { io } from "socket.io-client";
const socket = io("http://localhost:5001/",  { transports: ["websocket", "polling"] });
function Navbar() {
  const [userID, setUserID] = useState(sessionStorage.getItem("employee_ID") || "");
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token);
  console.log("isAuthenticated", isAuthenticated);

  const handleLogout = () => {
    console.log("Logout");
    dispatch(logout());
  }

  useEffect(() => {
    console.log("userID", userID);
    if (!userID) return; // Prevent emitting if userID is empty
  console.log("Connecting to socket...");
    // Register user with backend
    socket.emit("register", userID);
  console.log("Connected to socket");
    // Listen for real-time notifications
    socket.on("receive_notification", (message) => {
      setNotifications((prev) => [...prev, { message }]);
    })
    return () => {
      socket.off("receive_notification");
    };
  }, []);
  console.log("notifications =>", notifications)
  return (
    <div>
      <ul className="navbar">
        <li>
          <Link className="active" to='/dashboard'>
            Overview
          </Link>
        </li>
       
        <li>
          <Link to='/schedule'>Schedule</Link>
        </li>
        <li>
          <Link href="#about">Health Insight</Link>
        </li>
        <li>
         { isAuthenticated?
         <a onClick={handleLogout}>Logout</a> 
        :
        <Link to="/login">Login</Link>
        }
        </li>
      </ul>
      <Outlet/>
    </div>
  );
}

export default Navbar;
