export interface Trip {
  id: string;
  date: string;
  name: string;
  description: string;
  planet: string;
  durationInDays: number;
}

export interface TripState {
  list: null | Trip[];
  subscribeID: string;
}

export type TripAction =
  | { type: "FETCH_TRIPS" }
  | {
      type: "FETCH_TRIPS_SUCCEEDED";
      payload: {
        list: Trip[];
      };
    }
  | { type: "SET_SUBSCRIBE_ID"; payload: { tripID: string } }
  | { type: "CLEAR_SUBSCRIBE_ID" };
