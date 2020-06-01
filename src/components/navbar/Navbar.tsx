import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
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
      <NavLink
        to="/test"
        className="navbar__nav-link"
        activeClassName="navbar__nav-link_active"
      >
        TEST
      </NavLink>
    </nav>
  );
};

export default Navbar;
