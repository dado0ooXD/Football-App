import React, { useEffect, useState } from "react";
import "./Countries.css";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import countriesSlice, { getAllCountries } from "../../store/countriesSlice";
import CountriesCard from "../../components/CountriesCard/CountriesCard";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

const Countries = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.loading);

  useEffect(() => {
    dispatch(getAllCountries());
    console.log(countries);
  }, []);

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
        <div
          style={{
            width: "100%",
            height: "100vh",
            overflowY: "scroll",
            borderRadius: "20px",
          }}
        >
          <div className="search-container">
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="countries-main">
            {countries
              .filter((item, index) =>
                item.country_name.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, index) => (
                <CountriesCard key={index} {...item} />
              ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Countries;
