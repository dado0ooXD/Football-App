import React from "react";
import "./CountriesCard.css";

const CountriesCard = ({ country_logo, country_name }) => {
  return (
    <div className="countries-card">
      <img src={country_logo} alt="country_logo" className="country-logo" />
      <h5>{country_name}</h5>
    </div>
  );
};

export default CountriesCard;
