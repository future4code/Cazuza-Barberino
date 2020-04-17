import { ProfileAction, ProfilesState } from "./types";

const initialState: ProfilesState = {
  currentProfile: null,
  matches: [],
};

const profiles = (state = initialState, action: ProfileAction) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        currentProfile: action.payload.profile,
      };
    case "ADD_MATCH":
      return {
        ...state,
        matches: [...state.matches, action.payload.match],
      };
    case "SET_MATCHES":
      return {
        ...state,
        matches: action.payload.matches,
      };
    default:
      return state;
  }
};

export default profiles;
