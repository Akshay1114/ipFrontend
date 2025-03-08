import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { io } from "socket.io-client";
import { BellOutlined,ReloadOutlined  } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { wingWiseApi } from "../../utils/AxiosInstance";
const socket = io("http://localhost:5001/", { transports: ["websocket", "polling"] });
// const socket = io("https://rsinnovates.com/", { transports: ["websocket", "polling"] });
function Navbar() {
  const [userID, setUserID] = useState(sessionStorage.getItem("employee_ID") || "");
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token);
  console.log("isAuthenticated", isAuthenticated);
  const location = useLocation();
  const pathname = location.pathname;
  const handleLogout = () => {
    console.log("Logout");
    dispatch(logout());
  }

  useEffect(() => {
    console.log("userID USEEFFECT", userID);
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
  }, [userID]);

  useEffect(() => {
    function getNotifications(){
       if (!userID) return; // Prevent emitting if userID is empty
       wingWiseApi.get(`/getNotification?userID=${userID}`)
       .then((res) => {
         console.log(res.data);
         setNotifications(res.data);
       }
       )
        .catch((err) => {
          console.log(err);
        }
        );

    }
    getNotifications();
  }, [userID]);
  console.log("notifications =>", notifications)
  const handleNotification = () => {
    console.log("notifications", notifications);
    notifications.map((notification) => {
      console.log(notification.message);
    })
  }
  return (
    <div className="">
      <div className="navbar">
        <div className="navbar-left">
          <h2>Wing Wise</h2>
        </div>
        <ul className="navbar-center">
          <li className={pathname == '/dashboard'?"active":""}>
            <Link to='/dashboard'>
              Overview
            </Link>
          </li>

          <li  className={pathname == '/schedule'?"active":""}>
            <Link to='/schedule'>Schedule</Link>
          </li>
          <li className={pathname == '/healthInsight'?"active":""}>
            <Link to="/healthInsight">Health Insight</Link>
          </li>
        </ul>
        <div className="navbar-profile">
          <ul className="navbar-right">
            <li>
            <ReloadOutlined  style={{ fontSize: '24px', color: '#1890ff' }} />
            </li>
            <li>
              <BellOutlined onClick={handleNotification} style={{ fontSize: '24px', color: '#1890ff' }} />
            </li>
            <li>
              {isAuthenticated ?
                <a onClick={handleLogout}>Logout</a>
                :
                <Link to="/login">Login</Link>
              }
            </li>
          </ul>
        </div>
        <div>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification.message}</li>
            ))}
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
