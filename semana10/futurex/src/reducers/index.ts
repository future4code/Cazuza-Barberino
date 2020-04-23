import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";

interface RootState {
  router: RouterState<History.PoorMansUnknown>;
}

export const reducers = (history: History<History.PoorMansUnknown>) =>
  combineReducers<RootState>({
    router: connectRouter(history),
  });
