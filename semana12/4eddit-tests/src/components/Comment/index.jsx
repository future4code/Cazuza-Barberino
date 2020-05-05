import React, { Component } from "react";
import styled from "styled-components";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { RateButton } from "../global-style";
import moment from "moment/moment";
import axios from "axios";

// createdAt: 1588432757628
// ​​​​​
// id: "gJHa2rOhzxV2u00gVJ5l"
// ​​​​​
// text: "breiq bed"
// ​​​​​
// userVoteDirection: 0
// ​​​​​
// username: "dolucasduarte"
// ​​​​​
// votesCount: 1

export default class index extends Component {
  state = {
    votesCount: 0,
    userVoteDirection: 0,
  };

  voteComment = async (dir) => {
    this.setState({
      votesCount: this.state.votesCount - this.state.userVoteDirection + dir,
      userVoteDirection: dir,
    });
    try {
      axios.put(
        `https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts/${this.props.postId}/comment/${this.props.comment.id}/vote`,
        {
          direction: dir,
        },
        {
          headers: {
            auth: localStorage.getItem("token"),
          },
        }
      );
    } catch (err) {}
  };

  componentDidMount() {
    this.setState({
      userVoteDirection: this.props.comment.userVoteDirection,
      votesCount: this.props.comment.votesCount,
    });
  }

  render() {
    const { comment } = this.props;
    return (
      <PostComment>
        <CommentUser>
          {comment.username}{" "}
          <CommentPoints>
            {" "}
            {this.state.votesCount || 0} points •{" "}
            {moment(comment.createdAt).startOf("hour").fromNow()}
          </CommentPoints>
        </CommentUser>
        <CommentText>{comment.text}</CommentText>
        <CommentRating>
          <CommentRateBtn
            onClick={() =>
              this.voteComment(this.state.userVoteDirection === 1 ? 0 : 1)
            }
          >
            <GoArrowUp
              color={this.state.userVoteDirection !== 1 ? "#999" : "#333"}
              size="20px"
            />
          </CommentRateBtn>
          <CommentRateBtn
            onClick={() =>
              this.voteComment(this.state.userVoteDirection === -1 ? 0 : -1)
            }
          >
            <GoArrowDown
              color={this.state.userVoteDirection !== -1 ? "#999" : "#333"}
              size="20px"
            />
          </CommentRateBtn>
        </CommentRating>
      </PostComment>
    );
  }
}

const PostComment = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  border-left: 2px solid #ddd;
  margin-left: 20px;
  padding-left: 20px;
  padding-right: 40px;
`;

const CommentUser = styled.p`
  margin: 0;
  font-size: 12px;
`;

const CommentPoints = styled.span`
  color: #aaa;
`;

const CommentText = styled.p`
  margin: 0;
  font-size: 16px;
`;

const CommentRating = styled.div`
  position: absolute;
  top: 0;
  left: -13px;
`;

const CommentRateBtn = styled(RateButton)`
  background-color: #fff;

  &:hover {
    background-color: #ddd;
  }
`;
