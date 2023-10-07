import React, { useEffect } from "react";
import "./TopScorers.css";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getTopSocrers } from "../../store/standingsSlice";
import { useParams } from "react-router-dom";
import TopScorersCard from "../../components/TopScorersCard/TopScorersCard";

const TopScorers = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const topScorers = useSelector((state) => state.standings.topScorers);

  useEffect(() => {
    dispatch(getTopSocrers(id));
  }, []);
  return (
    <Layout>
      <div className="topscorers-main">
        <div className="topscorers-head">
          <h1>Top scorers</h1>
        </div>
        <div className="topscorers-body">
          <table style={{ padding: "0 30px" }} className="topscorers-table">
            <thead>
              <tr>
                <th style={{ textAlign: "start", fontSize: "20px" }}>#</th>
                <th style={{ textAlign: "start", fontSize: "20px" }}>Player</th>
                <th
                  className="topscorers-team-th"
                  style={{ textAlign: "start", fontSize: "20px" }}
                >
                  Team
                </th>
                <th style={{ textAlign: "center", fontSize: "20px" }}>G</th>
                <th style={{ textAlign: "center", fontSize: "20px" }}>GP</th>
                <th style={{ textAlign: "center", fontSize: "20px" }}>A</th>
              </tr>
            </thead>

            <tbody style={{ marginTop: "30px" }}>
              {topScorers?.map((item, index) => (
                <TopScorersCard key={index} {...item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default TopScorers;
