import React from "react";
import "./StatsCard.css";

const StatsCard = ({ type, home, away }) => {
  return (
    <div className="stats-card">
      <div className="stats-numbers">
        {" "}
        <h3>{home}</h3>
      </div>
      <div
        style={{
          height: "4px",
          backgroundColor:
            home > away ? "green" : home === away ? "white" : "red",
          width: "50%",
        }}
      ></div>
      <div className="stats-type">
        <h3>{type}</h3>
      </div>
      <div
        style={{
          height: "4px",
          backgroundColor:
            away > home ? "green" : home === away ? "white" : "red",
          width: "50%",
        }}
      ></div>
      <div className="stats-numbers">
        <h3>{away}</h3>
      </div>
    </div>
  );
};

export default StatsCard;
