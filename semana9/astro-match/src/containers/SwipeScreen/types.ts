import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers";
import { updateCurrentPage } from "../../reducers/routes/actions";
import {
  choosePerson,
  fetchPerson,
  dequeueProfile,
} from "../../reducers/profiles/actions";
import { Keyframes } from "styled-components";

const mapState = (state: RootState) => ({
  profileToSwipe: state.profiles.profileToSwap,
  matches: state.profiles.matches,
  fetching: state.profiles.fetching,
  profilesBeingFetch: state.profiles.profilesBeingFetch,
});

const mapDispatch = {
  goToMatchScreen: () => updateCurrentPage("MatchScreen"),
  chooseProfile: (id: string, choice: boolean) => choosePerson(id, choice),
  enqueueProfile: () => fetchPerson(),
  dequeueProfile: () => dequeueProfile(),
};

export const connector = connect(mapState, mapDispatch);

export interface State {
  currentAnimation:
    | ((translate: number, rotate: number) => () => Keyframes)
    | null;
  showSnackBar: boolean;
}

export type Props = ConnectedProps<typeof connector>;

export type OptionType = "like" | "dislike";
