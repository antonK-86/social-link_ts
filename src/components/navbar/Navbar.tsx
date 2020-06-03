import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink
        to="/about"
        className="navbar__nav-link navbar__nav-link_about"
        activeClassName="navbar__nav-link_active"
      >
        About
      </NavLink>
      <NavLink
        to="/users"
        className="navbar__nav-link"
        activeClassName="navbar__nav-link_active"
      >
        Users
      </NavLink>
      <NavLink
        to="/demoworks"
        className="navbar__nav-link"
        activeClassName="navbar__nav-link_active"
      >
        Demo works
      </NavLink>
    </nav>
  );
};

export default Navbar;
