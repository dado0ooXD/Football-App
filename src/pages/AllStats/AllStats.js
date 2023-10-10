import React, { useEffect } from "react";
import "./AllStats.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllStats, popUpStats } from "../../store/resultsSlice";
import { useParams } from "react-router-dom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const AllStats = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const match = useSelector((state) => state.results.oneMatch);
  const popUpStat = useSelector((state) => state.results.popUpStats);

  useEffect(() => {
    dispatch(getAllStats(id));
    dispatch(popUpStats(id));
  }, []);

  //   const subs = popUpStat[6]?.substitution.split(" ")[2];
  //   console.log(subs);

  return (
    <>
      {/* <Header /> */}
      <div className="match-stats">
        <div className="match-stats-main">
          <div className="match-stats-head">
            <div className="head-info">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
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
              <h5 style={{ marginRight: "20px" }}>{match[0]?.match_date}</h5>
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
                  <p
                    style={{
                      color:
                        match[0]?.match_status === "Finished" ||
                        match[0]?.match_status === "Half Time"
                          ? "white"
                          : "green",
                    }}
                  >
                    {match[0]?.match_status}
                  </p>
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
                <span style={{ marginLeft: "10px" }}>First half</span>
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
                            fontWeight: "bold",
                            marginLeft: "5px",
                          }}
                        >
                          {item.time}{" "}
                        </p>{" "}
                        <h4 style={{ marginLeft: "10px" }}>
                          {item.home_scorer}
                          <SportsSoccerIcon
                            style={{
                              display: item.home_scorer
                                ? "inline-block"
                                : "none",
                              fontSize: "20px",
                              marginLeft: "10px",
                            }}
                          />
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

                              display: item.home_fault
                                ? "inline-block"
                                : "none",
                              color: "yellow",
                              height: "20px",
                              width: "15px",
                              backgroundColor: "yellow",
                            }}
                          ></span>
                          <span>
                            <span style={{ color: "red" }}>
                              {" "}
                              {item.substitution.split(" ")[0]}
                            </span>
                            <span style={{ color: "red" }}>
                              {item.substitution.split(" ")[1]}
                            </span>
                            <span style={{ color: "black", margin: "0 5px" }}>
                              {item.substitution.split(" ")[2]}
                            </span>
                            <span style={{ color: "green" }}>
                              {item.substitution.split(" ")[3]}
                            </span>
                            <span style={{ color: "green" }}>
                              {item.substitution.split(" ")[4]}
                            </span>
                            <span style={{ color: "green" }}>
                              {item.substitution.split(" ")[5]}
                            </span>
                          </span>
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
                              fontWeight: "bold",
                              height: "20px",
                              width: "15px",
                              backgroundColor: "yellow",
                            }}
                          ></span>
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
                          <SportsSoccerIcon
                            style={{
                              display: item.away_scorer
                                ? "inline-block"
                                : "none",
                              fontSize: "20px",
                              marginRight: "10px",
                            }}
                          />
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
                            marginRight: "5px",
                            fontWeight: "bold",
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
                <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                  Second half
                </span>
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
                            marginLeft: "5px",
                            fontWeight: "bold",
                          }}
                        >
                          {item.time}{" "}
                        </p>{" "}
                        <h4 style={{ marginLeft: "10px" }}>
                          {item.home_scorer}
                          <SportsSoccerIcon
                            style={{
                              display: item.home_scorer
                                ? "inline-block"
                                : "none",
                              fontSize: "20px",
                              marginLeft: "10px",
                            }}
                          />
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

                              display: item.home_fault
                                ? "inline-block"
                                : "none",
                              color: "yellow",
                              height: "20px",
                              width: "15px",
                              backgroundColor: "yellow",
                            }}
                          ></span>
                          <span>
                            <span style={{ color: "red" }}>
                              {" "}
                              {item.substitution.split(" ")[0]}
                            </span>
                            <span style={{ color: "red" }}>
                              {item.substitution.split(" ")[1]}
                            </span>
                            <span style={{ color: "black", margin: "0 5px" }}>
                              {item.substitution.split(" ")[2]}
                            </span>
                            <span style={{ color: "green" }}>
                              {item.substitution.split(" ")[3]}
                            </span>
                            <span style={{ color: "green" }}>
                              {item.substitution.split(" ")[4]}
                            </span>
                            <span style={{ color: "green" }}>
                              {item.substitution.split(" ")[5]}
                            </span>
                          </span>
                        </h4>
                      </div>
                    ))}
                </div>
                <div className="away-stands">
                  {popUpStat
                    .filter((item) => Number(item.time) > 45)
                    .map((item, index) => (
                      <div key={index} className="feedback-away">
                        {/* <p
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
                        </p> */}
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
                              height: "20px",
                              width: "15px",
                              backgroundColor: "yellow",
                            }}
                          ></span>
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
                          <SportsSoccerIcon
                            style={{
                              display: item.away_scorer
                                ? "inline-block"
                                : "none",
                              marginRight: "10px",
                            }}
                          />
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
                          {/* <span
                            style={{
                              fontWeight: "bold",
                              display:
                                item.away_assist ||
                                item.away_scorer ||
                                item.away_fault
                                  ? "none"
                                  : "inline-block",
                            }}
                          >
                            <span style={{ color: "red" }}>
                              {" "}
                              {item.substitution.split(" ")[0]}
                            </span>
                            <span style={{ color: "red" }}>
                              {item.substitution.split(" ")[1]}
                            </span>
                            <span style={{ color: "black", margin: "0 5px" }}>
                              {item.substitution.split(" ")[2]}
                            </span>
                            <span style={{ color: "green" }}>
                              {item.substitution.split(" ")[3]}
                            </span>
                            <span style={{ color: "green" }}>
                              {item.substitution.split(" ")[4]}
                            </span>
                            <span style={{ color: "green" }}>
                              {item.substitution.split(" ")[5]}
                            </span>

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
                            marginRight: "5px",
                            fontWeight: "bold",
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
          <div className="match-stats-footer">
            <div className="match-stats-footer-item">
              {" "}
              <span>Time:</span>
              <span>Stadium:</span>
            </div>
            <div className="match-stats-footer-item2">
              <span>{match[0]?.match_time}</span>
              <span>{match[0]?.match_stadium}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllStats;
