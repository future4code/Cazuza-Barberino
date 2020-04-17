import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers";
import { updateCurrentPage } from "../../reducers/routes/actions";
import { choosePerson } from "../../reducers/profiles/actions";
import { Keyframes } from "styled-components";

const mapState = (state: RootState) => ({
  profileToSwipe: state.profiles.currentProfile,
});

const mapDispatch = {
  goToMatchScreen: () => updateCurrentPage("MatchScreen"),
  chooseProfile: (id: string, choice: boolean) => choosePerson(id, choice),
};

export const connector = connect(mapState, mapDispatch);

export interface State {
  currentAnimation: null | Keyframes;
  showCard: boolean;
}

export type Props = ConnectedProps<typeof connector>;

export type OptionType = "like" | "dislike";
