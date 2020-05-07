import { combineReducers } from "redux";
import plannerReducer from "./planner";
import { PlannerState } from "./planner/types";

export interface RootState {
  planner: PlannerState;
}

const reducers = combineReducers<RootState>({ planner: plannerReducer });

export default reducers;
