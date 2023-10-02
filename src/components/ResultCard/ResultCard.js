import React from "react";
import "./ResultCard.css";
import { useNavigate, useParams } from "react-router-dom";

const ResultCard = ({
  league_logo,
  league_name,
  league_year,
  country_logo,
  match_id,
  match_awayteam_name,
  match_awayteam_score,
  match_date,
  match_hometeam_name,
  match_hometeam_score,
  match_time,
  team_away_badge,
  team_home_badge,
  match_status,
  match_hometeam_halftime_score,
  match_awayteam_halftime_score,
}) => {
  // const navigate = useNavigate();

  return (
    <div
      className="result-card-main"
      // onClick={() => {
      //   navigate(`/stats/${match_id}`);
      // }}
    >
      <div className="result-card-second">
        {match_status ? (
          <div className="result-card-live">
            <p
              style={{
                color:
                  match_status === "Half Time"
                    ? "chocolate"
                    : match_status === "Finished"
                    ? "gray"
                    : "green",
              }}
            >
              {match_status}
            </p>
          </div>
        ) : (
          <div className="result-card-head">
            <p className="result-date-time">
              {match_time}
              <br />
              {match_date}
              <br />
              {match_status}
            </p>
          </div>
        )}
        <div className="result-card-body">
          <div className="team-badges">
            <img
              src={team_home_badge ? team_home_badge : country_logo}
              className="team-badge"
              alt="home_badge"
            />
            <img
              src={team_away_badge ? team_away_badge : country_logo}
              className="team-badge"
              alt="away_badge"
            />
          </div>
          <div>
            <p
              className="match-name"
              onClick={() => {
                console.log("hi");
              }}
            >
              {match_hometeam_name}
            </p>
            <p className="match-name">{match_awayteam_name}</p>
          </div>
        </div>
      </div>
      <div className="result-card-foot">
        <h4 className="match-score">{match_hometeam_score}</h4>
        <h4 className="match-score">{match_awayteam_score}</h4>
      </div>
    </div>
  );
};

export default ResultCard;
