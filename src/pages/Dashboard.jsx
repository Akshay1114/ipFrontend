import React, { useState } from "react";
import AdminDashboard from "../components/AdminDashboard";
import EmployeeDashboard from "../components/EmployeeDashboard";

function Dashboard(props) {
  const storedRole = sessionStorage.getItem("role");
  return (
   <>
{
  storedRole === "admin" ? (
    <div>
     <AdminDashboard/>
    </div>
  ) : (
    <div>
     <EmployeeDashboard/>
    </div>
  )
}
   </>
  );
}

export default Dashboard;
