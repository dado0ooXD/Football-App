import React, { useEffect } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../../store/newsSlice";
import { getLIveResults } from "../../store/resultsSlice";
import ResultCard from "../../components/ResultCard/ResultCard";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { fullDate } from "../../utils/dates";
import NewsCard from "../../components/NewsCard/NewsCard";
import { Tweet } from "react-tweet";

const Home = () => {
  const dispatch = useDispatch();
  const live = useSelector((state) => state.results.live);
  const loading = useSelector((state) => state.results.loading);
  const news = useSelector((state) => state.news.news);
  const newsContainer = [news[0], news[1], news[2]];

  useEffect(() => {
    dispatch(getAllNews());
    dispatch(getLIveResults());
    // setInterval(() => {
    //   dispatch(getLIveResults());
    // }, 60000);

    // return () => {
    //   clearInterval();
    // };
  }, []);
  return (
    <>
      <Header />
      <div className="home-main">
        {loading ? (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className="home-container">
            <div className="news-container">
              <span
                className="news-title"
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                News
              </span>
              {newsContainer.map((item, index) => (
                <NewsCard key={index} {...item} />
              ))}
            </div>
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
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
