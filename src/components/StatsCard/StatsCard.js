import React from "react";
import "./StatsCard.css";

const StatsCard = ({ type, home, away }) => {
  return (
    <div className="stats-card">
      <h3>{home}</h3>
      <h3>{type}</h3>
      <h3>{away}</h3>
    </div>
  );
};

export default StatsCard;
