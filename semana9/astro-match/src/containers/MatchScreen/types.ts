import { RootState } from "../../reducers";
import { updateCurrentPage } from "../../reducers/routes/actions";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  matches: state.profiles.matches,
});

const mapDispatch = {
  goToSwipeScreen: () => updateCurrentPage("SwipeScreen"),
};

export const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;
