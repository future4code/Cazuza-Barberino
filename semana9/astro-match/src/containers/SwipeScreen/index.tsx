import React, { Component } from "react";
import UserSwipeCard from "../../components/UserSwipeCard";
import {
  ButtonsWrapper,
  ContentWrapper,
  SwipeScreenWrapper,
  OptionButton,
} from "./styled";
import { swipeLeft, swipeRight } from "../../components/UserSwipeCard/styled";
import { Loader } from "../../components/Loader";
import { State, OptionType, Props, connector } from "./types";
import { Snackbar } from "@material-ui/core";
import Slide, { SlideProps } from "@material-ui/core/Slide";
import TrustfulForm from "../../components/TrustfulForm";

export class SwipeScreen extends Component<Props, State> {
  checkingMatchSucces: boolean;
  snackBarMsg: string;
  constructor(props: Props) {
    super(props);

    this.checkingMatchSucces = false;
    this.snackBarMsg = "";

    this.state = {
      currentAnimation: null,
      showSnackBar: false,
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.keyCode === 39) this.onChooseOption("like")();
    else if (ev.keyCode === 37) this.onChooseOption("dislike")();
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      this.checkingMatchSucces &&
      prevProps.matches.length < this.props.matches.length
    ) {
      this.snackBarMsg =
        this.props.matches[this.props.matches.length - 1].name +
        " matches with you!";
      this.setState({
        showSnackBar: true,
      });
    }
  }

  onChooseOption = (option: OptionType) => () => {
    if (
      this.props.profileToSwipe.length === 0 ||
      this.props.fetching ||
      this.state.currentAnimation !== null
    )
      return;

    this.setState({
      currentAnimation: option === "dislike" ? swipeRight : swipeLeft,
    });

    this.checkingMatchSucces = true;

    this.props.chooseProfile(
      this.props.profileToSwipe[0].id,
      option === "like"
    );

    this.props.enqueueProfile();

    setTimeout(() => {
      this.props.dequeueProfile();
      this.setState({ currentAnimation: null });
    }, 500);
  };

  TransitionDown = (props: SlideProps) => {
    return <Slide {...props} direction="down" />;
  };

  render() {
    const {
      profileToSwipe,
      fetching,
      profilesBeingFetch,
    } = this.props;
    const { currentAnimation, showSnackBar } = this.state;

    return (
      <SwipeScreenWrapper>
        <ContentWrapper>
          <Snackbar
            open={showSnackBar}
            message={this.snackBarMsg}
            TransitionComponent={this.TransitionDown}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={2000}
            onClose={() =>
              this.setState({
                showSnackBar: false,
              })
            }
          />
          {profileToSwipe.length > 0 &&
            profileToSwipe.map((profile, index) => (
              <UserSwipeCard
                index={index}
                key={profile.id}
                userToSwipe={profile}
                animation={index !== 0 ? null : currentAnimation}
                onChooseOption={this.onChooseOption}
              />
            ))}
          {profileToSwipe.length === 0 &&
            !fetching &&
            profilesBeingFetch === 0 && <TrustfulForm />}
          <Loader />
          <ButtonsWrapper
            show={
              currentAnimation === null &&
              !fetching &&
              profileToSwipe.length > 0
            }
          >
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
