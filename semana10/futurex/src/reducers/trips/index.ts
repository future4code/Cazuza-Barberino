import { TripState, TripAction } from "./types";

const initialState: TripState = {
  list: null,
  subscribeID: "",
};

const TripReducer = (
  state: TripState = initialState,
  action: TripAction
): TripState => {
  switch (action.type) {
    case "FETCH_TRIPS_SUCCEEDED":
      return {
        ...state,
        list: action.payload.list,
      };
    case "SET_SUBSCRIBE_ID":
      return {
        ...state,
        subscribeID: action.payload.tripID,
      };
    case "CLEAR_SUBSCRIBE_ID":
      return {
        ...state,
        subscribeID: "",
      };
    default:
      return state;
  }
};

export default TripReducer;
