import React from "react";
import Layout from "../../Layout/Layout";
import "./Home.css";
import Header from "../../components/Header/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-main">
        <div className="home-container"></div>
      </div>
    </>
  );
};

export default Home;
