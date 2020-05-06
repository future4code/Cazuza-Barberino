import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import TripReducer from "./trips";
import { TripState } from "./trips/types";

export interface RootState {
  router: RouterState<History.PoorMansUnknown>;
  trips: TripState;
}

export const reducers = (history: History<History.PoorMansUnknown>) =>
  combineReducers<RootState>({
    router: connectRouter(history),
    trips: TripReducer,
  });
