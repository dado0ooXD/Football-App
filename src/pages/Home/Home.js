import React, { useEffect } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../../store/newsSlice";
import { getLIveResults } from "../../store/resultsSlice";
import ResultCard from "../../components/ResultCard/ResultCard";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { fullDate } from "../../utils/dates";

const Home = () => {
  const dispatch = useDispatch();
  const live = useSelector((state) => state.results.live);
  const loading = useSelector((state) => state.results.loading);

  useEffect(() => {
    dispatch(getAllNews());
    dispatch(getLIveResults());
    setInterval(() => {
      dispatch(getLIveResults());
    }, 60000);

    return () => {
      clearInterval();
    };
  }, []);
  return (
    <>
      <Header />
      <div className="home-main">
        <div className="home-container">
          <div className="home-live-results">
            <div className="home-live-head">
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                Live matches
              </span>
            </div>
            {live?.map((item, index) => (
              <ResultCard key={index} {...item} />
            ))}
          </div>
          <div className="home-live-news"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
