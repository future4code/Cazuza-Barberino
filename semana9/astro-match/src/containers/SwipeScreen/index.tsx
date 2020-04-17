import React, { Component } from "react";
import UserSwipeCard from "../../components/UserSwipeCard";
import { AppBar } from "../../components/AppBar";
import {
  ButtonsWrapper,
  ContentWrapper,
  SwipeScreenWrapper,
  MatchIcon,
  OptionButton,
  Badge,
  NavBtnWrapper,
} from "./styled";
import { mdiAccountMultipleCheck } from "@mdi/js";
import { swipeLeft, swipeRight } from "../../components/UserSwipeCard/styled";
import { Loader } from "../../components/Loader";
import { State, OptionType, Props, connector } from "./types";
import { Snackbar } from "@material-ui/core";
import Slide, { SlideProps } from "@material-ui/core/Slide";

export class SwipeScreen extends Component<Props, State> {
  checkingMatchSucces: boolean;
  snackBarMsg: string;
  constructor(props: Props) {
    super(props);

    this.checkingMatchSucces = false;
    this.snackBarMsg = "";

    this.state = {
      currentAnimation: null,
      showCard: true,
      showButtons: false,
      showSnackBar: false,
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.profileToSwipe !== this.props.profileToSwipe) {
      this.setState({ showCard: true, currentAnimation: null });
    }

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
      !this.props.profileToSwipe ||
      !this.state.showCard ||
      this.state.currentAnimation !== null
    )
      return;

    this.setState({
      currentAnimation: option === "dislike" ? swipeRight : swipeLeft,
      showButtons: true,
    });

    this.checkingMatchSucces = true;

    this.props.chooseProfile(this.props.profileToSwipe.id, option === "like");

    setTimeout(() => this.setState({ showCard: false }), 500);
  };

  TransitionDown = (props: SlideProps) => {
    return <Slide {...props} direction="down" />;
  };

  render() {
    const { profileToSwipe, goToMatchScreen, matches } = this.props;
    const {
      currentAnimation,
      showCard,
      showButtons,
      showSnackBar,
    } = this.state;

    return (
      <SwipeScreenWrapper>
        <AppBar
          rightAction={
            <NavBtnWrapper onClick={goToMatchScreen}>
              <Badge show={matches.length > 0}>{matches.length}</Badge>
              <MatchIcon size={1.5} path={mdiAccountMultipleCheck} />
            </NavBtnWrapper>
          }
        />
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
          {currentAnimation !== null && <Loader />}
          {profileToSwipe && showCard ? (
            <UserSwipeCard
              userToSwipe={profileToSwipe}
              animation={currentAnimation}
              onChooseOption={this.onChooseOption}
            />
          ) : (
            <Loader />
          )}
          <ButtonsWrapper show={showButtons}>
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
