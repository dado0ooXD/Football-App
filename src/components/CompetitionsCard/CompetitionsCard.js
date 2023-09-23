import React from "react";
import "./CompetitionsCard.css";

const CompetitionsCard = ({
  country_logo,
  country_name,
  league_logo,
  league_name,
  league_season,
}) => {
  return (
    <div className="competitions-card">
      <div className="competitions-card-header">
        <img src={league_logo} alt="league_logo" className="league-logo-card" />
        <h2 className="league-name-competitions">{league_name}</h2>
      </div>
      <div className="competitions-card-body">
        <img
          src={country_logo}
          alt="country_logo"
          className="country-logo-card"
        />
        <h5 className="country-name-competitions">{country_name}</h5>
      </div>
    </div>
  );
};

export default CompetitionsCard;
