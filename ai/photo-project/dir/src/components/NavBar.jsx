import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import GoodNews from "./Pages/GoodNews";
import Home from "./Pages/Home";
import Music from "./Pages/Music";
import Photos from "./Pages/Photos";
import Programming from "./Pages/Programming";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar">
        <ul>
          <NavLink to="/" className="nav-item" exact>
            {Home}
          </NavLink>
          <NavLink to="/photos" className="nav-item">
            {Photos}
          </NavLink>
          <NavLink to="/music" className="nav-item">
            {Music}
          </NavLink>
          <NavLink to="/programming" className="nav-item">
            {Programming}
          </NavLink>
          <NavLink to="/goodnews" className="nav-item">
            {GoodNews}
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
