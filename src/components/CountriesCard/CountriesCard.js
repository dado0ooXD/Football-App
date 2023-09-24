import React from "react";
import "./CountriesCard.css";
import { useNavigate } from "react-router-dom";

const CountriesCard = ({ country_logo, country_name, country_id }) => {
  const navigate = useNavigate();
  return (
    <div
      className="countries-card"
      onClick={() => navigate(`/competitions/${country_id}`)}
    >
      <img src={country_logo} alt="country_logo" className="country-logo" />
      <h5 style={{ color: "white" }}>{country_name}</h5>
    </div>
  );
};

export default CountriesCard;
