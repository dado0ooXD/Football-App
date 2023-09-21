import React, { useEffect, useState } from "react";
import "./Countries.css";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import countriesSlice, { getAllCountries } from "../../store/countriesSlice";
import CountriesCard from "../../components/CountriesCard/CountriesCard";

const Countries = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  useEffect(() => {
    dispatch(getAllCountries());
    console.log(countries);
  }, []);

  return (
    <Layout>
      <div className="countries-main">
        {countries.map((item, index) => (
          <CountriesCard key={index} {...item} />
        ))}
      </div>
    </Layout>
  );
};

export default Countries;
