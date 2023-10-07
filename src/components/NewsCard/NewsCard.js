import React from "react";
import "./NewsCard.css";

const NewsCard = ({
  author,
  content,
  description,
  publishedAt,
  title,
  url,
  urlToImage,
}) => {
  return (
    <div className="news-card">
      <div className="news-card-head">
        <a href={url} target="_blank" rel="noreferrer">
          <img className="news-card-img" src={urlToImage} alt="news-img" />
        </a>{" "}
        <h4 style={{ width: "200px" }}>{title?.slice(0, 70)}</h4>
      </div>
      <div className="news-card-body">
        <p className="news-card-description">
          {description?.slice(0, 90)}
          {content?.slice(0, 50)}
        </p>
        <span className="news-card-publishedAt">
          {publishedAt?.slice(0, 10)}
        </span>
      </div>
    </div>
  );
};

export default NewsCard;
