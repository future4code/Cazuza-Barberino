import { RootState } from "../../reducers";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  matches: state.profiles.matches,
});
export const connector = connect(mapState, {});

export type Props = ConnectedProps<typeof connector>;
