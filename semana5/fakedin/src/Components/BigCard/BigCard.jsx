import React from "react";
import PropTypes from "prop-types";
import "./BigCard.css";

const BigCard = props => {
  return (
    <div className="big-card">
      <div className="img-wrapper">
        <img src={props.cardImg} alt="" />
      </div>
      <div className="text-wrapper">
        <p className="title">{props.cardTitle}</p>
        <p className="card-text">{props.cardText}</p>
      </div>
    </div>
  );
};

BigCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  cardText: PropTypes.string.isRequired,
  cardImg: PropTypes.string.isRequired
};

export default BigCard;
