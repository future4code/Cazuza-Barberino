import React, { Component } from "react";
import "./Styles/Header.css";
import search from "../images/search.png";

export default class Header extends Component {
  ToggleAnimation = () => {
    document.getElementById("menu-btn").classList.toggle("animate");
    document.getElementsByTagName("nav")[0].classList.toggle("animate");
    document.getElementsByClassName("App")[0].classList.toggle("animate");
  };

  render() {
    return (
      <header>
        <div className="header-container">
          <div className="left-wrapper">
            <div id="menu-btn" onClick={this.ToggleAnimation}>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
            <p className="logo" onClick={this.props.cVidFunc}>
              FutureTube
            </p>
          </div>

          <form action="">
            <input type="text" placeholder="Search" />
            <button type="submit">
              <img src={search} alt="" />
            </button>
          </form>

          <div className="right-wrapper">
            <div className="icon"></div>
            <div className="icon"></div>
            <div className="icon"></div>
            <div className="profile">
              <img src={require("../images/my-photo.jpg")} alt="" />
            </div>
          </div>

          <nav>
            <div className="overlay" onClick={this.ToggleAnimation}></div>
            <div className="btn-group">
              <div className="side-btn" onClick={this.props.cVidFunc}>
                Home
              </div>
              <div className="side-btn">Trendig</div>
              <div className="side-btn">Subscriptions</div>
            </div>
            <div className="btn-group">
              <div className="side-btn">Library</div>
              <div className="side-btn">History</div>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}
