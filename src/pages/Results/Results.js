import React, { useEffect, useState } from "react";
import "./Results.css";
import Layout from "../../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getResults, setResultsTo } from "../../store/resultsSlice";
import ResultCard from "../../components/ResultCard/ResultCard";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { nextSevenDays, prevSevenDays } from "../../utils/dates";
import { fullDate } from "../../utils/dates";
import { closeSnackbar } from "../../store/newsSlice";
import { Snackbar } from "@mui/material";

const Results = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const results = useSelector((state) => state.results.results);
  const loading = useSelector((state) => state.results.loading);
  const isOpen = useSelector((state) => state.news.openSnack);

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

  // Close snackbar
  const closeSnack = () => {
    dispatch(closeSnackbar());
  };

  // Snackbars styles
  const snackbarStyles = {
    snackbar: {
      width: "90%",
      backgroundColor: "#3B7A57",
      color: "white",
    },
  };

  useEffect(() => {
    dispatch(getResults({ id: id, fromDate: fromDate, toDate: toDate }));
    // return () => {
    //   setResultsTo();
    // };
  }, [id, fromDate, toDate]);

  const uefa = results[0]?.league_name.split(" ")[0] === "UEFA";

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
            <div
              className="results-info-title"
              onClick={() => navigate(`/standings/${id}`)}
            >
              <img
                src={
                  results[0]?.country_logo
                    ? results[0].country_logo
                    : uefa
                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/2560px-Flag_of_Europe.svg.png"
                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEURERGD9/d/AAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII="
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
            <>
              {results.map((item, index) => (
                <ResultCard key={index} item={item} />
              ))}{" "}
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                color="success"
                open={isOpen}
                message="Match added to favourites!"
                autoHideDuration={600}
                onClose={closeSnack}
                ContentProps={{
                  style: snackbarStyles.snackbar,
                }}
              />
            </>
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
