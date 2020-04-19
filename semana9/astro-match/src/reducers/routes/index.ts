import { RoutesState, RoutesAction, Pages } from "./types";

const initialState: RoutesState = {
  currentPage: Pages.SwipeScreen,
};

export default (state = initialState, action: RoutesAction): RoutesState => {
  switch (action.type) {
    case "UPDATE_CURRENT_PAGE":
      return { currentPage: action.payload.newPage };
    default:
      return state;
  }
};
