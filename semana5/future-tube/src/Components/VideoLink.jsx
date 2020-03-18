import React, { Component } from "react";
import "./Styles/VideoLink.css";
import { videoList } from "./VideoData";

export default class VideoLink extends Component {
  render() {
    return (
      <div
        className="video-link"
        onClick={() => this.props.oVidFunc(this.props.videoIndex)}
      >
        <video src={videoList[this.props.videoIndex].link}></video>
        <div className="bottom-wrapper">
          <div className="channel-image">
            <img src={require('../images/soter.jpg')} alt=""/>
          </div>
          <div className="video-description">
            <p className="video-title">
              {videoList[this.props.videoIndex].name}
            </p>
            <p className="channel-name">Canal do Soter</p>
            <p className="view-count">{this.props.views}views</p>
          </div>
        </div>
      </div>
    );
  }
}
