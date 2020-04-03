import React, { Component } from "react";
import {
  FollowBtnContainer,
  FollowingIcon,
  UnfollowingIcon,
  BugFixingWrapperOfTheHolyProgrammerOrder,
} from "./styles";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default class FollowBtn extends Component {
  render() {
    const { children, following, follow, unfollow } = this.props;

    return (
      <FollowBtnContainer>
        {children}
        <BugFixingWrapperOfTheHolyProgrammerOrder
          onClick={following ? unfollow : follow}
        >
          <FollowingIcon following={following}>
            <FaHeart size="100%" />
          </FollowingIcon>
          <UnfollowingIcon following={following}>
            <FaRegHeart size="100%" />
          </UnfollowingIcon>
        </BugFixingWrapperOfTheHolyProgrammerOrder>
      </FollowBtnContainer>
    );
  }
}
