import { all, fork } from "redux-saga/effects";
import { watchFetchTrips } from "./trips.sagas";

export const rootSaga = function* root() {
  yield all([fork(watchFetchTrips)]);
};
