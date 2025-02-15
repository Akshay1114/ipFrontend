import React from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <ul className="navbar">
        <li>
          <Link className="active" href="#home">
            Home
          </Link>
        </li>
        <li>
          <Link href="#news">News</Link>
        </li>
        <li>
          <Link href="#contact">Contact</Link>
        </li>
        <li>
          <Link href="#about">About</Link>
        </li>
      </ul>
      <Outlet/>
    </div>
  );
}

export default Navbar;
