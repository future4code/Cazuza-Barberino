import * as PlannerWatchers from "./plannerSagas";
import { all, fork } from "redux-saga/effects";

const mySaga = function* root() {
  yield all(Object.values(PlannerWatchers).map(fork));
};

export default mySaga;
