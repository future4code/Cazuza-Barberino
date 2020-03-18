import React, { Component } from "react";
import "./Styles/VideoDetails.css";
import VideoLink from "./VideoLink";
import { videoList } from "./VideoData";

export default class VideoDetails extends Component {
  setVideos = () => {
    let videos = [];
    for (let i = 0; i < 20; i++) {
      videos.push(
        <VideoLink
          videoIndex={Math.floor(Math.random() * videoList.length)}
          views={Math.floor(Math.random() * 999) + "K "}
          oVidFunc={this.props.oVidFunc}
        />
      );
    }
    return videos;
  };

  render() {
    return (
      <div className="video-details">
        <div className="video-wrapper">
          <video src={videoList[this.props.videoIndex].link} controls></video>
          <div className="vid-interaction">
            <p className="vid-title">{videoList[this.props.videoIndex].name}</p>
            <div className="btn-container">
              <button className="vid-btn-style">Like</button>
              <button className="vid-btn-style">Dislike</button>
            </div>
            <button className="vid-btn-style" onClick={this.props.cVidFunc}>
              Back
            </button>
          </div>
        </div>
        <div className="recomendations">{this.setVideos()}</div>
      </div>
    );
  }
}
