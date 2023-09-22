import React, { useEffect } from "react";
import "./Competitions.css";
import { useDispatch } from "react-redux";
import { getCompetitions } from "../../store/countriesSlice";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";

const Competitions = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompetitions(id));
  }, [id]);
  return <Layout>Competitions</Layout>;
};

export default Competitions;
