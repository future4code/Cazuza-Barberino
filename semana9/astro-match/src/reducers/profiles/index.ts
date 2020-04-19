import { ProfileAction, ProfilesState } from "./types";

const initialState: ProfilesState = {
  profileToSwap: [],
  matches: [],
  fetching: false,
  profilesBeingFetch: 0,
};

const profiles = (state = initialState, action: ProfileAction) => {
  switch (action.type) {
    case "ENQUEUE_PROFILE":
      return {
        ...state,
        profilesBeingFetch: Math.max(state.profilesBeingFetch - 1, 0),
        profileToSwap: action.payload.profile
          ? [...state.profileToSwap, action.payload.profile]
          : [...state.profileToSwap],
      };
    case "DEQUEUE_PROFILE":
      let newArr = [...state.profileToSwap];
      newArr.shift();
      return {
        ...state,
        profileToSwap: newArr,
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
    case "CLEAR_SWIPE_PROFILES":
      return {
        ...state,
        profileToSwap: [],
      };
    case "SET_FETCH":
      return {
        ...state,
        fetching: action.payload.fetch,
      };
    case "FETCHING_PROFILE":
      return {
        ...state,
        profilesBeingFetch: state.profilesBeingFetch + 1,
      };
    default:
      return state;
  }
};

export default profiles;
