import React from "react";
import "./Sidebar.css";
import { leagues } from "../../utils/league";
import LeagueButton from "../LeagueButton/LeagueButton";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <h1>Leagues</h1>
      <div className="sidebar-body">
        {leagues.map((item, index) => (
          <LeagueButton key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
