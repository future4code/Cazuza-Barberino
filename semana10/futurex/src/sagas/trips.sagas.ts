import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { fetchTrips } from "../services/api";
import { fetchTripsSucceeded } from "../reducers/trips/actions";

function* FetchTrips() {
  try {
    const response = yield call(fetchTrips);
    yield put(fetchTripsSucceeded(response.data.trips));
  } catch (e) {
    yield console.log("err");
  }
}

export function* watchFetchTrips() {
  yield takeLatest("FETCH_TRIPS", FetchTrips);
}
