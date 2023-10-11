import Layout from "../../Layout/Layout";
import FavouriteCard from "../../components/FavouriteCard/FavouriteCard";
import ResultCard from "../../components/ResultCard/ResultCard";
import "./Favourites.css";

const Favourites = () => {
  const favourites = JSON.parse(localStorage.getItem("favourites"));

  console.log("Favoriti => ", favourites);

  return (
    <Layout>
      <div className="favourites-container">
        <div className="favourites-info">
          <span>Favourites</span>
        </div>
        <div className="favourites-main">
          {favourites?.map((item, index) => (
            <FavouriteCard key={index} item={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Favourites;
