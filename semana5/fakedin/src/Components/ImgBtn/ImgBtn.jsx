import React from "react";
import PropTypes from "prop-types";
import "./ImgBtn.css";

function ImgBtn(props) {
  return (
    <div className="img-btn">
      <img src={props.btnImg} alt="" />
      <p>{props.btnText}</p>
    </div>
  );
}

ImgBtn.propTypes = {
  btnImg: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired
};

export default ImgBtn;
