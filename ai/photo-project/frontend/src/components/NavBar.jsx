import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <NavLink to="/" className="nav-item" exact>
        Home
      </NavLink>
      <NavLink to="/photos" className="nav-item">
        Photos
      </NavLink>
      <NavLink to="/music" className="nav-item">
        Music
      </NavLink>
      <NavLink to="/programming" className="nav-item">
        Programming
      </NavLink>
      <NavLink to="/goodnews" className="nav-item">
        Good News
      </NavLink>
    </div>
  );
};

export default NavBar;
