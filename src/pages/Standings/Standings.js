import React, { useEffect } from "react";
import "./Standings.css";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllStandings } from "../../store/standingsSlice";
import StandingCard from "../../components/StandingCard/StandingCard";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

const Standings = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.standings.standings);

  useEffect(() => {
    dispatch(getAllStandings(id));
  }, []);

  console.log(teams);
  return (
    <Layout>
      {teams.length > 0 ? (
        <div className="standings-main">
          <div className="standings-head">
            <h2>{teams[0]?.league_name}</h2>
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
