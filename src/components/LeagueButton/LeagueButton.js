import React from "react";
import "./LeagueButton.css";
import { useNavigate } from "react-router-dom";

const LeagueButton = ({
  league_name,
  name,
  league_logo,
  country_logo,
  league_id,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="league-button"
      onClick={() => {
        navigate(`/results/${league_id}`);
      }}
    >
      <img src={league_logo} alt="league_logo" className="league-logo" />
      <h4 className="league-name">{league_name}</h4>
    </div>
  );
};

export default LeagueButton;
