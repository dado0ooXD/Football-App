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
                    .map((item, index) => (
                      <div key={index} className="feedback-home">
                        <p
                          style={{
                            display:
                              item.home_assist ||
                              item.home_scorer ||
                              item.home_fault
                                ? "inline-block"
                                : "none",
                          }}
                        >
                          {item.time}{" "}
                        </p>{" "}
                        <h4 style={{ marginLeft: "10px" }}>
                          {item.home_scorer}
                          {item.home_fault}
                          <span
                            style={{
                              marginLeft: "10px",
                              display: item.home_assist
                                ? item.home_assist
                                : "none",
                            }}
                          >
                            ({item.home_assist})
                          </span>
                          {/* <span
                            style={{
                              display:
                                item.home_assist ||
                                item.home_scorer ||
                                item.home_fault
                                  ? "inline-block"
                                  : "none",
                              color: "yellow",
                            }}
                          >
                            ({item.home_assist})
                          </span> */}
                          <span
                            style={{
                              marginLeft: "15px",

                              display:
                                item.home_assist ||
                                item.home_scorer ||
                                item.home_fault
                                  ? "inline-block"
                                  : "none",
                              color: "yellow",
                            }}
                          >
                            {item.card}
                          </span>
                          <span>{item.substitution}</span>
                        </h4>
                      </div>
                    ))}
                </div>
                <div className="away-stands">
                  {popUpStat
                    .filter((item) => Number(item.time) < 45)
                    .map((item, index) => (
                      <div key={index} className="feedback-away">
                        <span
                          style={{
                            marginLeft: "15px",
                            display: item.card ? "inline-block" : "none",
                          }}
                        >
                          <span
                            style={{
                              display:
                                item.away_assist ||
                                item.away_scorer ||
                                item.away_fault
                                  ? "inline-block"
                                  : "none",
                              marginRight: "10px",
                              color: "yellow",
                            }}
                          >
                            {item.card}{" "}
                          </span>
                        </span>{" "}
                        <h4 style={{ marginRight: "10px" }}>
                          <span
                            style={{
                              marginLeft: "10px",
                              display: item.away_assist
                                ? item.away_assist
                                : "none",
                              marginRight: "10px",
                            }}
                          >
                            ({item.away_assist})
                          </span>
                          {item.away_scorer}

                          {item.away_fault}

                          {/* <span
                            style={{
                              display: item.home_assist
                                ? "inline-block"
                                : "none",
                            }}
                          >
                            ({item.home_assist})
                          </span> */}
                        </h4>
                        <p
                          style={{
                            display:
                              item.away_assist ||
                              item.away_scorer ||
                              item.away_fault
                                ? "inline-block"
                                : "none",
                          }}
                        >
                          {item.time}{" "}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="away-team-info">
              <div className="away-team-info-head">
                <span>Second half</span>
              </div>
              <div className="stands">
                <div className="home-stands">
                  {popUpStat
                    .filter((item) => Number(item.time) > 45)
                    .map((item, index) => (
                      <div key={index} className="feedback-home">
                        <p
                          style={{
                            display:
                              item.home_assist ||
                              item.home_scorer ||
                              item.home_fault ||
                              item.substitution
                                ? "inline-block"
                                : "none",
                          }}
                        >
                          {item.time}{" "}
                        </p>{" "}
                        <h4 style={{ marginLeft: "10px" }}>
                          {item.home_scorer}
                          {item.home_fault}
                          <span
                            style={{
                              marginLeft: "10px",
                              display: item.home_assist
                                ? item.home_assist
                                : "none",
                            }}
                          >
                            ({item.home_assist})
                          </span>
                          {/* <span
                            style={{
                              display:
                                item.home_assist ||
                                item.home_scorer ||
                                item.home_fault
                                  ? "inline-block"
                                  : "none",
                              color: "yellow",
                            }}
                          >
                            ({item.home_assist})
                          </span> */}
                          <span
                            style={{
                              marginLeft: "15px",

                              display:
                                item.home_assist ||
                                item.home_scorer ||
                                item.home_fault
                                  ? "inline-block"
                                  : "none",
                              color: "yellow",
                            }}
                          >
                            {item.card}
                          </span>
                          <span>{item.substitution}</span>
                        </h4>
                      </div>
                    ))}
                </div>
                <div className="away-stands">
                  {popUpStat
                    .filter((item) => Number(item.time) > 45)
                    .map((item, index) => (
                      <div key={index} className="feedback-away">
                        <p
                          style={{
                            display:
                              item.home_assist ||
                              item.home_scorer ||
                              item.home_fault
                                ? "inline-block"
                                : "none",
                          }}
                        >
                          {item.time}{" "}
                        </p>
                        <span
                          style={{
                            marginLeft: "15px",
                            display: item.card ? "inline-block" : "none",
                          }}
                        >
                          <span
                            style={{
                              display:
                                item.away_assist ||
                                item.away_scorer ||
                                item.away_fault
                                  ? "inline-block"
                                  : "none",
                              marginRight: "10px",
                              color: "yellow",
                            }}
                          >
                            {item.card}{" "}
                          </span>
                        </span>{" "}
                        <h4 style={{ marginRight: "10px" }}>
                          <span
                            style={{
                              display: item.away_assist
                                ? item.away_assist
                                : "none",
                              marginRight: "10px",
                            }}
                          >
                            ({item.away_assist})
                          </span>
                          {item.away_scorer}
                          {item.away_fault}

                          {/* <span
                            style={{
                              display: item.home_assist
                                ? "inline-block"
                                : "none",
                            }}
                          >
                            ({item.home_assist})
                          </span> */}
                        </h4>
                        <p
                          style={{
                            display:
                              item.away_assist ||
                              item.away_scorer ||
                              item.away_fault
                                ? "inline-block"
                                : "none",
                          }}
                        >
                          {item.time}{" "}
                        </p>
                      </div>
                    ))}
                </div>
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
