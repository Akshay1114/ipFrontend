import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token);
  console.log("isAuthenticated", isAuthenticated);

  const handleLogout = () => {
    console.log("Logout");
    dispatch(logout());
  }
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
