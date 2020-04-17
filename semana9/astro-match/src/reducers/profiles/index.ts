import { ProfileAction, ProfilesState } from "./types";

const initialState: ProfilesState = {
  profileToSwap: [],
  matches: [],
  fetching: false,
};

const profiles = (state = initialState, action: ProfileAction) => {
  switch (action.type) {
    case "SET_PROFILE":
      if (!action.payload.profile) return state;
      // let newArr = [...state.profileToSwap, action.payload.profile];
      // if (newArr.length > 3) newArr.shift();
      return {
        ...state,
        profileToSwap: [...state.profileToSwap, action.payload.profile],
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
    default:
      return state;
  }
};

export default profiles;
