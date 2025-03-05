import React from 'react'
import AdminSchedule from '../components/AdminSchedule';
import EmployeeSchedule from '../components/EmployeeSchedule';

function Schedule() {
    const storedRole = sessionStorage.getItem("role");
  return (
      storedRole === "admin" ? (
        <AdminSchedule/>
      ):(
        <EmployeeSchedule/>
      )
  )
  
}

export default Schedule
