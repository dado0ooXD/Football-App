import React from "react";
import "./LeagueButton.css";

const LeagueButton = ({ league_name, name, league_logo, country_logo }) => {
  return (
    <div className="league-button">
      <img src={league_logo} alt="league_logo" className="league-logo" />
      <h4 className="league-name">{league_name}</h4>
    </div>
  );
};

export default LeagueButton;
