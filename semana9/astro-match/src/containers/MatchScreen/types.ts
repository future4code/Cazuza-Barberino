import { RootState } from "../../reducers";
import { connect, ConnectedProps } from "react-redux";
import { updateCurrentPage } from "../../reducers/routes/actions";
import { setCurrenteProfile } from "../../reducers/profiles/actions";
import { Profile } from "../../reducers/profiles/types";
import { Pages } from "../../reducers/routes/types";

const mapState = (state: RootState) => ({
  matches: state.profiles.matches,
});

const mapDispatch = {
  setCurrenteProfile: (match: Profile) => setCurrenteProfile(match),
  updateCurrentPage: (page: Pages) => updateCurrentPage(page),
};

export const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;
