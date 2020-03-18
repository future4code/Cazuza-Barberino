import React, { Component } from "react";
import "./Styles/VideoGrid.css";
import VideoLink from "./VideoLink";
import { videoList } from "./VideoData.js";

export default class VideoGrid extends Component {
  setVideos = () => {
    let videos = [];
    for (let i = 0; i < 8; i++) {
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
    return <div className="video-grid">{this.setVideos()}</div>;
  }
}
