import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import Home from "./Pages/Home";
import Music from "./Pages/Music";
import Photos from "./Pages/Photos";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar">
        <ul>
          <NavLink to="/" className="nav-item" exact>
            {Home}
            Home
          </NavLink>
          <NavLink to="/photos" className="nav-item">
            {Photos}
            Photos
          </NavLink>
          <NavLink to="/music" className="nav-item">
            Music
          </NavLink>
          <NavLink to="/programming" className="nav-item">
            {Music}
            Programming
          </NavLink>
          <NavLink to="/goodnews" className="nav-item">
            Good News
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
