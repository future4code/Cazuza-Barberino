import React, { Component } from "react";
import "./ShareToButton.css";

export default class ShareToButton extends Component {
  render() {
    return (
      <>
        <img src={this.props.image} onClick={this.props.onShareBtn} alt="" className="share-icon" />
      </>
    );
  }
}
