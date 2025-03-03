import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

function AdminNav({}) {
   
  return (
    <div>
   
    <Outlet/>
  </div>
  )
}

export default AdminNav
