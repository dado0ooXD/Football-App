import React, { useEffect } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar, getAllNews } from "../../store/newsSlice";
import { getLIveResults } from "../../store/resultsSlice";
import ResultCard from "../../components/ResultCard/ResultCard";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { fullDate } from "../../utils/dates";
import NewsCard from "../../components/NewsCard/NewsCard";
import { Snackbar } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const live = useSelector((state) => state.results.live);
  const loading = useSelector((state) => state.results.loading);
  const newsLoading = useSelector((state) => state.news.loading);
  const news = useSelector((state) => state.news.news);
  const isOpen = useSelector((state) => state.news.openSnack);

  useEffect(() => {
    dispatch(getAllNews());
    dispatch(getLIveResults());
    console.log("News ===>", news);
    // setInterval(() => {
    //   dispatch(getLIveResults());
    // }, 60000);

    // return () => {
    //   clearInterval();
    // };
  }, []);

  // Close snackbar
  const closeSnack = () => {
    dispatch(closeSnackbar());
  };

  // Snackbars styles
  const snackbarStyles = {
    snackbar: {
      maxWidth: "200px",
      backgroundColor: "#3B7A57",
      color: "white",
    },
  };

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
            <LoadingSpinner />
          </div>
        ) : (
          <div className="home-container">
            <div className="news-container">
              {newsLoading ? (
                <div
                  style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LoadingSpinner />
                </div>
              ) : (
                <>
                  {" "}
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
                  {news?.map((item, index) => (
                    <NewsCard key={index} {...item} />
                  ))}
                </>
              )}
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
                <ResultCard key={index} item={item} />
              ))}

              <Snackbar
                color="success"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={isOpen}
                message="Match added to favourites!"
                autoHideDuration={600}
                onClose={closeSnack}
                ContentProps={{
                  style: snackbarStyles.snackbar, // Stilizacija
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
