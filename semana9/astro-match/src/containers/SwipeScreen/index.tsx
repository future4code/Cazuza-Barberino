import React, { Component } from "react";
import UserSwipeCard from "../../components/UserSwipeCard";
import { AppBar } from "../../components/AppBar";
import {
  ButtonsWrapper,
  ContentWrapper,
  SwipeScreenWrapper,
  MatchIcon,
  OptionButton,
} from "./styled";
import { mdiAccountMultipleCheck } from "@mdi/js";
import { swipeLeft, swipeRight } from "../../components/UserSwipeCard/styled";
import { Loader } from "../../components/Loader";
import { State, OptionType, Props, connector } from "./types";

export class SwipeScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentAnimation: null,
      showCard: true,
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.profileToSwipe !== this.props.profileToSwipe) {
      this.setState({ showCard: true, currentAnimation: null });
    }
  }

  onChooseOption = (option: OptionType) => () => {
    if (
      !this.props.profileToSwipe ||
      !this.state.showCard ||
      this.state.currentAnimation !== null
    )
      return;

    this.setState({
      currentAnimation: option === "dislike" ? swipeRight : swipeLeft,
    });

    this.props.chooseProfile(this.props.profileToSwipe.id, option === "like");

    setTimeout(() => this.setState({ showCard: false }), 500);
  };

  render() {
    const { profileToSwipe, goToMatchScreen } = this.props;
    const { currentAnimation, showCard } = this.state;

    return (
      <SwipeScreenWrapper>
        <AppBar
          rightAction={
            <div onClick={goToMatchScreen}>
              <MatchIcon size={1.5} path={mdiAccountMultipleCheck} />
            </div>
          }
        />
        <ContentWrapper>
          {currentAnimation !== null && <Loader />}
          {profileToSwipe && showCard ? (
            <UserSwipeCard
              userToSwipe={profileToSwipe}
              animationDirection={currentAnimation}
            />
          ) : (
            <Loader />
          )}
          <ButtonsWrapper>
            <OptionButton
              onClick={this.onChooseOption("dislike")}
              option="dislike"
            >
              X
            </OptionButton>
            <OptionButton onClick={this.onChooseOption("like")} option="like">
              <span role="img" aria-label="heart">
                ♥️
              </span>
            </OptionButton>
          </ButtonsWrapper>
        </ContentWrapper>
      </SwipeScreenWrapper>
    );
  }
}

export default connector(SwipeScreen);
