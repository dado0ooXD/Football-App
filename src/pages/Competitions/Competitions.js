import React, { useEffect } from "react";
import "./Competitions.css";
import { useDispatch, useSelector } from "react-redux";
import { getCompetitions } from "../../store/countriesSlice";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import CompetitionsCard from "../../components/CompetitionsCard/CompetitionsCard";

const Competitions = () => {
  const { id } = useParams();
  const competitions = useSelector((state) => state.countries.competitions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompetitions(id));
  }, [id]);
  return (
    <Layout>
      <div className="competitions-main">
        {competitions.map((item, index) => (
          <CompetitionsCard key={index} {...item} />
        ))}
      </div>
    </Layout>
  );
};

export default Competitions;
