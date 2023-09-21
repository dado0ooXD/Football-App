import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="nav-wrapper">
        <div className="logo-container">
          <img
            className="logo"
            src="https://i.imgur.com/gea725J.png"
            alt="Logo"
          />
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
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  Home
                </Link>
              </li>
              <li className="nav-tab">
                <Link
                  to="/teams"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Teams
                </Link>
              </li>
              <li className="nav-tab">
                <Link
                  to="/countries"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Countries
                </Link>
              </li>
              <li className="nav-tab">FAQ</li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
