import { plannerWatchers } from "./plannerSagas";
import { all, fork } from "redux-saga/effects";

const mySaga = function* root() {
  yield all(Object.values(plannerWatchers).map(fork));
};

export default mySaga;
