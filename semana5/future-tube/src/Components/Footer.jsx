import React, { Component } from "react";
import "./Styles/Footer.css";
import facebook from "../images/facebook.png";
import instagram from "../images/instagram.png";
import twitter from "../images/twitter.png";

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <h1>FutureTube</h1>
        <p>© Created by Cazuza All Rights Reserved.</p>
        <div className="socials">
          <img src={facebook} alt="" />
          <img src={twitter} alt="" />
          <img src={instagram} alt="" />
        </div>
      </footer>
    );
  }
}
