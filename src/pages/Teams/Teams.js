import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";

const Teams = () => {
  // useEffect(() => {
  //   fetch(
  //     "https://apiv3.apifootball.com/?action=get_teams&league_id=152&APIkey=0db195f627a844713476ffb1e62ae3a4ef28c79007c2aeb9237b740b010c111f"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);

  const [realData, setRealData] = useState([]);

  function filterData(props) {
    const Countries = ["Spain", "Italy", "France", "Germany", "England"];
    const FilteredCountries = props.filter((data) =>
      Countries.includes(data.country_name)
    );

    return FilteredCountries;
  }

  return (
    <Layout>
      Teams{" "}
      <button
        onClick={() => {
          fetch(
            "https://apiv3.apifootball.com/?action=get_countries&APIkey=0db195f627a844713476ffb1e62ae3a4ef28c79007c2aeb9237b740b010c111f"
          )
            .then((res) => res.json())
            .then((data) => {
              setRealData(filterData(data));
              console.log(realData);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Click
      </button>
    </Layout>
  );
};

export default Teams;
