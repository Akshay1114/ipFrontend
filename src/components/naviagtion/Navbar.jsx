import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { io } from "socket.io-client";
import { BellFilled } from "@ant-design/icons"; // Changed from BellOutlined
import { wingWiseApi } from "../../utils/AxiosInstance";
import Logo from "../../assets/logo/WingWise-Logo.png";
// Assuming a placeholder profile image exists in assets
import ProfilePlaceholder from "../../assets/images/John.png"; // Add a placeholder image to this path
import "./Navbar.css";

// Socket connection remains the same
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
  // Keep track of count for the dot logic, but don't display the number
  const [newMsgCount, setNewMsgCount] = useState(0);

  // State for profile dropdown
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token);
  const location = useLocation();
  const pathname = location.pathname;

  // Ref for closing dropdowns when clicking outside
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const handleLogout = () => {
    console.log("Logout");
    dispatch(logout());
    setProfileDropdownVisible(false); // Close dropdown on logout
  };

  // Effect for socket connection and receiving messages
  useEffect(() => {
    if (!userID) return;
    console.log("Connecting to socket for userID:", userID);
    socket.emit("register", userID);
    const socketId = userID === "admin" ? "receive_admin_notification" : "receive_notification";
    console.log("Listening on socketId:", socketId);

    const handleMessage = (message) => {
      // console.log(socketId, message);
      setNewMsg(true);
      // Increment count instead of pushing messages here
      setNewMsgCount(prevCount => prevCount + 1);
      // Add notification to the list optimistically or refetch
      setNotifications(prev => [message, ...prev]); // Add new message to the top
    };

    socket.on(socketId, handleMessage);

    return () => {
      socket.off(socketId, handleMessage);
    };
  }, [userID]);

  // Effect for fetching initial notifications
  useEffect(() => {
    function getNotifications() {
      if (!userID) return;
      const endPoint = userID === "admin" ? "/getNotification/admin" : `/getNotification?userID=${userID}`;
      wingWiseApi
        .get(endPoint)
        .then((res) => {
           setNotifications(res.data || []); // Ensure it's an array
           setNewMsgCount(0); // Reset count after fetching
           setNewMsg(false); // Assume fetched notifications are read initially unless logic dictates otherwise
        })
        .catch((err) => {
          console.error("Error fetching notifications:", err);
          setNotifications([]); // Set to empty array on error
        });
    }
    getNotifications();
  }, [userID]); // Refetch if userID changes

  // Effect to handle clicks outside dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setViewNotification(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleNotificationClick = () => {
    setViewNotification(!viewNotification);
    if (!viewNotification) {
       // Optionally: Mark notifications as read in backend here
       setNewMsg(false); // Hide red dot when opening
       setNewMsgCount(0); // Reset count when opening
       // Maybe refetch notifications to get the latest read status if needed
    }
  };

  const handleProfileClick = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const getToken = sessionStorage.getItem("token"); // Keep this check

  return (
    <div className="navbar-container"> {/* Added a container */}
      <div className="navbar navbar-bg">
        <div className="navbar-left">
          <Link to={isAuthenticated ? "/dashboard" : "/login"}>
            <img alt="logo" src={Logo} className="navbar-logo" />
          </Link>
        </div>
        {isAuthenticated && ( // Only show nav links if authenticated
          <ul className="navbar-center">
            <li className={pathname === "/dashboard" ? "active" : ""}>
              <Link to="/dashboard">Overview</Link>
            </li>
            <li className={pathname === "/schedule" ? "active" : ""}>
              <Link to="/schedule">Schedule</Link>
            </li>
            {/* Changed text to Crew Insights, kept link /health-insights for now */}
            <li className={pathname === "/health-insights" || pathname === "/display-sleep" ? "active" : ""}>
              <Link to="/health-insights">Health Insights</Link>
            </li>
          </ul>
        )}
        <div className="navbar-right">
          {isAuthenticated ? (
            <>
              {/* Notification Icon */}
              <div className="notification-wrapper" ref={notificationRef}>
                 <div className="icon-container" onClick={handleNotificationClick}>
                   <BellFilled className="bell-icon" />
                   {newMsg && <span className="notification-dot"></span>}
                 </div>
                {viewNotification && (
                  <div className="notificationBox">
                    {notifications.length > 0 ? (
                      <ul className="notificationList notification-list">
                        {notifications.map((notification, index) => (
                          <li key={index}>{notification.message}</li>
                        ))}
                      </ul>
                    ) : (
                       <p className="no-notifications">No new notifications</p>
                    )}
                  </div>
                )}
              </div>

              {/* Profile Section */}
              <div className="profile-wrapper" ref={profileRef}>
                <div className="profile-section" onClick={handleProfileClick}>
                  <img src="https://randomuser.me/api/portraits/women/8.jpg"  alt="Profile" className="profile-image" />
                  <span className="profile-initials">JD</span>
                </div>
                {profileDropdownVisible && (
                  <div className="profile-dropdown">
                    <ul>
                      <li style={{ cursor: 'pointer' }}>My profile</li>
                      <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Show Login link if not authenticated
            <ul className="navbar-right-logged-out">
               <li>
                 <Link to="/login">Login</Link>
               </li>
            </ul>
          )}
        </div>
      </div>
      {/* Outlet remains to render child routes */}
      <Outlet />
    </div>
  );
}

export default Navbar;