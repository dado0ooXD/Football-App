import React, { useEffect } from "react";
import "./Standings.css";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllStandings } from "../../store/standingsSlice";
import StandingCard from "../../components/StandingCard/StandingCard";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const Standings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.standings.standings);

  useEffect(() => {
    dispatch(getAllStandings(id));
  }, []);

  return (
    <Layout>
      {teams.length > 0 ? (
        <div className="standings-main">
          <div className="standings-head">
            <h2 onClick={() => navigate(`/results/${id}`)}>
              {teams[0]?.league_name}
              <span
                style={{ color: "gray", fontSize: "20px", marginLeft: "10px" }}
              >
                {teams[0].country_name}
              </span>
            </h2>

            <div className="standings-promotions">
              <div className="promotion-item">
                <div
                  style={{
                    height: "10px",
                    width: "10px",
                    backgroundColor: "#0075ff",
                  }}
                ></div>
                <h5>Promotion CL</h5>
              </div>

              <div className="promotion-item">
                <div
                  style={{
                    height: "10px",
                    width: "10px",
                    backgroundColor: "#ab5e03",
                  }}
                ></div>
                <h5>Promotion EL</h5>
              </div>

              <div className="promotion-item">
                <div
                  style={{
                    height: "10px",
                    width: "10px",
                    backgroundColor: "#961a3d",
                  }}
                ></div>
                <h5>Relagation</h5>
              </div>

              <div className="promotion-item">
                <SportsSoccerIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/topscorers/${id}`);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="standings-body">
            <table className="standings-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th style={{ textAlign: "start", paddingLeft: "10px" }}>
                    Team
                  </th>
                  <th>P</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>F</th>
                  <th>A</th>
                  <th>PTS</th>
                </tr>
              </thead>

              <tbody style={{ marginTop: "10px" }}>
                {teams.map((item, index) => (
                  <StandingCard key={index} {...item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h1>No standings for this event.</h1>
          {/* <LoadingSpinner /> */}
        </div>
      )}
    </Layout>
  );
};

export default Standings;
