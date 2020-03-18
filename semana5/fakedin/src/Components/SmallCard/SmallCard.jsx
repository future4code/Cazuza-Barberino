import React from "react";
import PropTypes from "prop-types";
import "./SmallCard.css";

function SmallCard(props) {
  return (
    <div className="small-card">
      <img src={props.cardImg} alt="" />
      <p>
        <span className="title">{props.cardTitle + ": "}</span>
        {props.cardText}
      </p>
    </div>
  );
}

SmallCard.propTypes = {
  cardImg: PropTypes.string.isRequired,
  cardText: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired
};

export default SmallCard;
