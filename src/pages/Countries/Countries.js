import React, { useEffect, useState } from "react";
import "./Countries.css";
import Layout from "../../Layout/Layout";
import axios from "axios";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const getCountries = async () => {
    const response = await axios.get(
      `https://apiv3.apifootball.com/?action=get_countries&APIkey=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.data;

    setCountries(data);
    console.log(data);
    return data;
  };

  useEffect(() => {
    getCountries();
  }, []);

  return <Layout>Countries</Layout>;
};

export default Countries;
