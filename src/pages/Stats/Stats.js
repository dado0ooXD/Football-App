import React, { useEffect, useState } from "react";
import "./Stats.css";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMatchStats } from "../../store/resultsSlice";
import StatsCard from "../../components/StatsCard/StatsCard";

const Stats = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const stats = useSelector((state) => state.results.stats);

  useEffect(() => {
    dispatch(getMatchStats(id));
    console.log(stats);
  }, [id]);

  return (
    <Layout>
      <div className="stats-main">
        <div className="stats-container">
          {stats.length > 0 ? (
            <>
              <div className="stats-title">
                <h1>Home</h1>
                <h1>Away</h1>
              </div>
              {stats.map((item, index) => (
                <StatsCard key={index} {...item} />
              ))}
            </>
          ) : (
            <div
              style={{
                height: "88vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <h1>
                When the match starts the <br /> statistics will be available.
              </h1>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Stats;
