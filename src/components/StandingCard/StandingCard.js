import React from "react";
import "./StandingCard.css";

const StandingCard = ({
  team_name,
  overall_league_payed,
  overall_league_W,
  overall_league_L,
  overall_league_D,
  overall_league_position,
  overall_league_PTS,
  overall_league_GA,
  overall_league_GF,

  overall_promotion,
  team_badge,
}) => {
  const relegation = overall_promotion.split(" ")[0] === "Relegation";
  const promotionCL = overall_promotion.split(" ")[2] === "Champions";
  const leagueEurope = overall_promotion.split(" ")[2] === "Europa";
  const promotionColor = promotionCL
    ? "#0075ff"
    : relegation
    ? "#961a3d"
    : leagueEurope
    ? "#ab5e03"
    : "white";

  return (
    <tr>
      <th style={{ marginLeft: "20px" }}>
        <span
          style={{
            color: promotionColor,
          }}
        >
          {overall_league_position}
        </span>
      </th>
      <th>
        <div className="standing-card-team">
          <img
            src={team_badge}
            alt="team_badge"
            className="team-badge-standings"
          />
          <span style={{ marginLeft: "10px" }}>{team_name}</span>
        </div>
      </th>
      <th>{overall_league_payed}</th>
      <th>{overall_league_W}</th>
      <th>{overall_league_D}</th>
      <th>{overall_league_L}</th>
      <th>{overall_league_GF}</th>
      <th>{overall_league_GA}</th>

      <th>{overall_league_PTS}</th>
    </tr>
  );
};

export default StandingCard;
