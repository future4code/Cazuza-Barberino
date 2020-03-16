import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import VideoGrid from "./Components/VideoGrid";
import VideoDetails from "./Components/VideoDetails";
import SideBar from "./Components/SideBar";
import { currentVideo } from "./Components/VideoData";

export default class App extends Component {
  state = {
    inVideo: false,
    currentVideo: 0
  };

  OpenVideo = x => {
    this.setState({
      inVideo: true,
      currentVideo: x
    });
  };

  BackToHome = () => {
    this.setState({
      inVideo: false
    });
  };

  render() {
    return (
      <div className="App">
        <Header cVidFunc={this.BackToHome} />

        <div className="main">
          <div className="content">
            {this.state.inVideo ? (
              <VideoDetails
                videoIndex={this.state.currentVideo}
                cVidFunc={this.BackToHome}
                oVidFunc={this.OpenVideo}
              />
            ) : (
              <VideoGrid oVidFunc={this.OpenVideo} />
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
