import React, { useEffect } from "react";
import "./Results.css";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getResults } from "../../store/resultsSlice";
import ResultCard from "../../components/ResultCard/ResultCard";

const Results = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const results = useSelector((state) => state.results.results);

  // Today's date
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const fullDate = `${year}-${month}-${day}`;

  useEffect(() => {
    dispatch(getResults({ id: id, toDate: fullDate }));
  }, [id]);
  return (
    <Layout>
      <div className="results-container">
        {results.map((item, index) => (
          <ResultCard key={index} {...item} />
        ))}
      </div>
    </Layout>
  );
};

export default Results;
