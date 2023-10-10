import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="nav-wrapper">
        <div className="logo-container">
          {/* <img
            src="https://res.cloudinary.com/skillsmatter/image/upload/c_crop,g_custom/v1567091866/mhxmtdmg97hvpsh9fewi.png"
            alt="app-logo"
            className="app-logo"
          /> */}
          <h2 style={{ color: "white" }}>Football App</h2>
        </div>
        <nav>
          <input className="hidden" type="checkbox" id="menuToggle" />
          <label className="menu-btn" htmlFor="menuToggle">
            <div className="menu"></div>
            <div className="menu"></div>
            <div className="menu"></div>
          </label>
          <div className="nav-container">
            <ul className="nav-tabs">
              <li className="nav-tab">
                {" "}
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  Home
                </Link>
              </li>
              <li className="nav-tab">
                <Link
                  to="/teams"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Favourites
                </Link>
              </li>
              <li className="nav-tab">
                <Link
                  to="/countries"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  All Leagues
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
