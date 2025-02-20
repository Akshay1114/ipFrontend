import React from 'react'
import { Outlet } from 'react-router-dom'

function SideBar() {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default SideBar
