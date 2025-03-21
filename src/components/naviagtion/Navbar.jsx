import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { io } from "socket.io-client";
import { BellOutlined, ReloadOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { wingWiseApi } from "../../utils/AxiosInstance";
import Logo from "../../assets/logo/WingWise-Logo.png"
import axios from "axios";
const socket = io("http://localhost:5001/", {
  transports: ["websocket", "polling"],
});
// const socket = io("https://rsinnovates.com/", { transports: ["websocket", "polling"] });
function Navbar() {
  const [userID, setUserID] = useState(
    sessionStorage.getItem("employee_ID") || ""
  );
  const [notifications, setNotifications] = useState([]);
  const [viewNotification, setViewNotification] = useState(false);
  const [newMsg, setNewMsg] = useState(false);

  const [newMsgCount, setNewMsgCount] = useState([]);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token);

  // console.log("isAuthenticated", isAuthenticated);

  const location = useLocation();
  const pathname = location.pathname;

  const handleLogout = () => {
    console.log("Logout");
    dispatch(logout());
  };

  useEffect(() => {
    console.log("userID USEEFFECT", userID);
    // console.log("userID", userID);
    if (!userID) return; // Prevent emitting if userID is empty
    console.log("Connecting to socket...");
    // Register user with backend
    socket.emit("register", userID);
    console.log("Connected to socket");
    // Listen for real-time notifications
    const socketId = userID == "admin" ? "receive_admin_notification" : "receive_notification";
    console.log("socketId", socketId);
    socket.on(socketId, (message) => {
      // console.log(socketId, message);
      setNewMsg(true);
      let newArr = [...newMsgCount];
      newArr.push({ ...message });
      setNewMsgCount(newArr);
    });
    return () => {
      socket.off(socketId);
    };
  }, [userID]);

  useEffect(() => {
    function getNotifications() {
      if (!userID) return; // Prevent emitting if userID is empty
      const endPoint = userID == "admin" ? "/getNotification/admin" : `/getNotification?userID=${userID}`;
      wingWiseApi
        .get(endPoint)
      // axios.get(`http://localhost:5001/api${endPoint}`)
        .then((res) => {
          // console.log(res.data);
          setNotifications(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getNotifications();
  }, []);
  
  // console.log("notifications =>", notifications);
  const handleNotification = () => {
    // console.log("notifications", notifications);
    setViewNotification(!viewNotification);
    setNewMsg(false);
  };
  const getToken = sessionStorage.getItem("token");
  return (
    <div className="">
      <div className="navbar">
        <div className="navbar-left">
          {/* <h2>Wing Wise</h2> */}
          <Link to="/dashboard">
          <img alt="logo" src={Logo} />
          </Link>
        </div>
        <ul className="navbar-center">
          <li className={pathname == "/dashboard" ? "active" : ""}>
            <Link to="/dashboard">Overview</Link>
          </li>

          <li className={pathname == "/schedule" ? "active" : ""}>
            <Link to="/schedule">Schedule</Link>
          </li>
          <li className={pathname == "/health-insights" ? "active" : ""}>
            <Link to="/health-insights">Health Insight</Link>
          </li>
        </ul>
        <div className="navbar-profile">
          <ul className="navbar-right">
           { getToken&&  <li>
              <ReloadOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
            </li>}
           { getToken&& <li className="bellIcon">
              <BellOutlined
                onClick={handleNotification}
                style={{ fontSize: "24px", color: newMsg ? "red" : "#1890ff" }}
              />
              {newMsg&&<span className="notificationCount">{newMsgCount.length}</span>}
            </li>}
            <li>
              {isAuthenticated ? (
                <a onClick={handleLogout}>Logout</a>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
        {viewNotification && (
          <div className="notificationBox">
            <ul className="notificationList">
              {notifications.map((notification, index) => (
                <li key={index}>{notification.message}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
