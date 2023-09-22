import React, { useEffect, useState } from "react";
import "./Countries.css";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import countriesSlice, { getAllCountries } from "../../store/countriesSlice";
import CountriesCard from "../../components/CountriesCard/CountriesCard";

const Countries = () => {
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
          <h1 style={{ color: "black" }}>Loading...</h1>
        </div>
      ) : (
        <div className="countries-main">
          {countries.map((item, index) => (
            <CountriesCard key={index} {...item} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Countries;
