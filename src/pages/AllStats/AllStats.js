import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./AllStats.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllStats, popUpStats } from "../../store/resultsSlice";
import { useParams } from "react-router-dom";

const AllStats = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const match = useSelector((state) => state.results.oneMatch);
  const popUpStat = useSelector((state) => state.results.popUpStats);

  useEffect(() => {
    dispatch(getAllStats(id));
    dispatch(popUpStats(id));
  }, []);

  return (
    <>
      <Header />
      <div className="match-stats">
        <div className="match-stats-main">
          <div className="match-stats-head">
            <div className="head-info">
              {" "}
              <img
                src={match[0]?.country_logo}
                alt="logo"
                className="country_logo_one"
              />
              <h4 style={{ marginLeft: "10px" }}>
                {match[0]?.country_name}: {match[0]?.league_name}
              </h4>
            </div>
            <div className="head-result">
              <div
                style={{
                  height: "120px",
                  width: "120px",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "15px",
                }}
              >
                <img
                  className="head_badge"
                  src={match[0]?.team_home_badge}
                  alt="badge"
                />
              </div>
              <div className="result-score">
                <div style={{ display: "flex" }}>
                  <span className="score-number">
                    {match[0]?.match_hometeam_score}
                  </span>
                  <div>
                    <span style={{ fontSize: "50px", color: "white" }}>-</span>
                  </div>
                  <span className="score-number">
                    {" "}
                    {match[0]?.match_awayteam_score}
                  </span>
                </div>
                <div>
                  <p>{match[0]?.match_status}</p>
                </div>
              </div>
              <div
                style={{
                  height: "120px",
                  width: "120px",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "15px",
                }}
              >
                <img
                  className="head_badge"
                  src={match[0]?.team_away_badge}
                  alt="badge"
                />
              </div>
            </div>
          </div>
          <div className="match-stats-body">
            <div className="home-team-info">
              <div className="home-team-info-head">
                <span>First half</span>
              </div>
              <div className="stands">
                <div className="home-stands">
                  {popUpStat
                    .filter((item) => Number(item.time) < 45)
                    .map((item) => (
                      <p>{item.time}</p>
                    ))}
                </div>
                <div className="away-stands">
                  {popUpStat
                    .filter((item) => Number(item.time) > 45)
                    .map((item) => (
                      <p>{item.time}</p>
                    ))}
                </div>
              </div>
              {/* <div style={{ backgroundColor: "green" }}>
                {popUpStat
                  .filter((item) => Number(item.time) < 45)
                  .map((item) => (
                    <p>
                      {item.time} {}
                    </p>
                  ))}
              </div> */}
            </div>
            <div className="away-team-info">
              <div className="away-team-info-head">
                <span>Second half</span>
              </div>
            </div>
          </div>
          <div className="match-stats-footer"></div>
        </div>
      </div>
    </>
  );
};

export default AllStats;
