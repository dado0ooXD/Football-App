import React, { useEffect } from "react";
import Layout from "../../Layout/Layout";
import "./Home.css";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../../store/newsSlice";
import { getLIveResults } from "../../store/resultsSlice";
import ResultCard from "../../components/ResultCard/ResultCard";

const Home = () => {
  const dispatch = useDispatch();
  const live = useSelector((state) => state.results.live);
  useEffect(() => {
    dispatch(getAllNews());
    dispatch(getLIveResults());
  }, []);
  return (
    <>
      <Header />
      <div className="home-main">
        <div className="home-container">
          <div className="home-live-results">
            {live.map((item, index) => (
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
