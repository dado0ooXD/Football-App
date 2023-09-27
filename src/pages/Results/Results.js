import React, { useEffect, useState } from "react";
import "./Results.css";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getResults } from "../../store/resultsSlice";
import ResultCard from "../../components/ResultCard/ResultCard";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { nextSevenDays, prevSevenDays } from "../../utils/dates";

const Results = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const results = useSelector((state) => state.results.results);
  const loading = useSelector((state) => state.results.loading);

  // Today's date
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const fullDate = `${year}-${month}-${day}`;

  // From To
  const [fromDate, setFromDate] = useState(prevSevenDays);
  const [toDate, setToDate] = useState(fullDate);

  // Upcoming matches
  const upcoming = () => {
    setFromDate(fullDate);
    setToDate(nextSevenDays);
  };

  // Previous matches
  const prevResults = () => {
    setFromDate(prevSevenDays);
    setToDate(fullDate);
  };

  useEffect(() => {
    dispatch(getResults({ id: id, fromDate: fromDate, toDate: toDate }));
  }, [id, fromDate, toDate]);

  return (
    <Layout>
      {loading ? (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <div className="results-container">
          <div className="results-info">
            <div className="results-info-title">
              <img
                src={
                  results[0]?.country_logo
                    ? results[0].country_logo
                    : "https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/UEFA_Champions_League.svg/225px-UEFA_Champions_League.svg.png"
                }
                alt="results_info_logo"
                className="results-info-logo"
              />

              <h3>
                {results[0]?.league_name}
                <br />
                <span style={{ fontSize: "15px", color: "gray" }}>
                  {results[0]?.country_name}
                </span>
              </h3>
              {/* <h5>{results[0]?.country_name}</h5> */}
            </div>
            <div className="results-schedule">
              <button
                className="results-prev-upcoming results-button"
                style={{
                  border:
                    fromDate === prevSevenDays ? "1px solid white" : "none",
                }}
                onClick={prevResults}
              >
                Results
              </button>
              <button
                className="results-prev-upcoming"
                onClick={upcoming}
                style={{
                  border: fromDate === fullDate ? "1px solid white" : "none",
                }}
              >
                Upcoming
              </button>
            </div>
          </div>
          {results.length > 0 ? (
            results.map((item, index) => <ResultCard key={index} {...item} />)
          ) : (
            <div
              style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>No data for this event!</h1>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Results;
