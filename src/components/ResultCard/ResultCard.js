import React from "react";
import "./ResultCard.css";
// import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourites } from "../../store/newsSlice";

const ResultCard = ({ item }) =>
  //   {
  //   league_logo,
  //   league_name,
  //   league_year,
  //   country_logo,
  //   match_id,
  //   match_awayteam_name,
  //   match_awayteam_score,
  //   match_date,
  //   match_hometeam_name,
  //   match_hometeam_score,
  //   match_time,
  //   team_away_badge,
  //   team_home_badge,
  //   match_status,
  //   match_hometeam_halftime_score,
  //   match_awayteam_halftime_score,
  // }
  {
    const openPopUp = () => {
      const url = `http://localhost:3000/matchstats/${item.match_id}`;
      const windowName = "Popup";
      const windowFeatures = "width=650,height=850";

      window.open(url, windowName, windowFeatures);
    };

    // Favourites
    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.news.favourites);

    return (
      <div className="result-card-main">
        <div className="result-card-second" onClick={openPopUp}>
          {item?.match_status ? (
            <div className="result-card-live">
              <p
                style={{
                  color:
                    item?.match_status === "Half Time"
                      ? "chocolate"
                      : item?.match_status === "Finished"
                      ? "gray"
                      : "green",
                }}
              >
                {item?.match_status}
              </p>
            </div>
          ) : (
            <div className="result-card-head">
              <p className="result-date-time">
                {item?.match_time}
                <br />
                {item?.match_date}
                <br />
                {item?.match_status}
              </p>
            </div>
          )}
          <div className="result-card-body">
            <div className="team-badges">
              <img
                src={
                  item?.team_home_badge
                    ? item?.team_home_badge
                    : item?.country_logo
                }
                className="team-badge"
                alt="home_badge"
              />
              <img
                src={
                  item?.team_away_badge
                    ? item?.team_away_badge
                    : item?.country_logo
                }
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
                {item?.match_hometeam_name}
              </p>
              <p className="match-name">{item?.match_awayteam_name}</p>
            </div>
          </div>
        </div>
        <div className="result-card-foot">
          <div>
            <h4 className="match-score">{item?.match_hometeam_score}</h4>
            <h4 className="match-score">{item?.match_awayteam_score}</h4>
          </div>
          <div>
            {/* {favourites.includes(item.match_id) ? (
              <StarIcon color="white" />
            ) : ( */}
            <StarOutlineIcon
              color="white"
              onClick={() => {
                dispatch(addToFavourites(item));
              }}
            />
            {/* )} */}
          </div>
        </div>
      </div>
    );
  };

export default ResultCard;
