import { Snackbar } from "@mui/material";
import Layout from "../../Layout/Layout";
import FavouriteCard from "../../components/FavouriteCard/FavouriteCard";
import ResultCard from "../../components/ResultCard/ResultCard";
import "./Favourites.css";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../../store/newsSlice";

const Favourites = () => {
  const favourites = JSON.parse(localStorage.getItem("favourites"));
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.news.openSnack);

  // console.log("Favoriti => ", favourites);

  // Snackbars styles
  const snackbarStyles = {
    snackbar: {
      backgroundColor: "#CD5C5C",
      color: "white",
    },
  };

  // Close snackbar
  const closeSnack = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Layout>
      <div className="favourites-container">
        {favourites?.length > 0 ? (
          <>
            <div className="favourites-info">
              <span>Favourites</span>
            </div>
            <div className="favourites-main">
              {favourites?.map((item, index) => (
                <FavouriteCard key={index} item={item} />
              ))}
            </div>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={isOpen}
              message="Match removed from favourites!"
              autoHideDuration={600}
              onClose={closeSnack}
              ContentProps={{
                style: snackbarStyles.snackbar, // Stilizacija
              }}
            />
          </>
        ) : (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1> No Favourites added!</h1>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favourites;
