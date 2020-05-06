import { TripAction, Trip } from "./types";

export const fetchTrips = (): TripAction => ({
  type: "FETCH_TRIPS",
});

export const fetchTripsSucceeded = (list: Trip[]): TripAction => ({
  type: "FETCH_TRIPS_SUCCEEDED",
  payload: {
    list,
  },
});

export const setSubscribeID = (tripID: string): TripAction => ({
  type: "SET_SUBSCRIBE_ID",
  payload: {
    tripID,
  },
});

export const clearSubscribeID = (): TripAction => ({
  type: "CLEAR_SUBSCRIBE_ID",
});
