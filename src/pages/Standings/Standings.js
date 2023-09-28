import React, { useEffect } from "react";
import "./Standings.css";
import Layout from "../../Layout/Layout";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllStandings } from "../../store/standingsSlice";

const Standings = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStandings(id));
  }, []);
  return (
    <Layout>
      <div>Standings</div>;
    </Layout>
  );
};

export default Standings;
