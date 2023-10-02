import React from "react";
import "./TopScorersCard.css";

const TopScorersCard = ({
  goals,
  player_name,
  player_place,
  team_name,
  assists,
  penalty_goals,
}) => {
  return (
    <tr style={{ textAlign: "start" }}>
      <td style={{ padding: "7px 0", color: "white", fontWeight: "bold" }}>
        {player_place}
      </td>
      <td style={{ padding: "7px 0", color: "white", fontWeight: "bold" }}>
        {player_name}
      </td>
      <td
        className="topscorers-team-td "
        style={{ padding: "7px 0", color: "white", fontWeight: "bold" }}
      >
        {team_name}
      </td>
      <td
        style={{
          padding: "7px 0",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {goals}
      </td>
      <td
        style={{
          padding: "7px 0",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {penalty_goals}
      </td>
      <td
        style={{
          padding: "7px 0",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {assists}
      </td>
    </tr>
  );
};

export default TopScorersCard;
