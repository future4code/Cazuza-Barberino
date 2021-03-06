export interface Profile {
  id: string;
  age: number;
  name: string;
  photo: string;
  bio: string;
}

export interface ProfilesState {
  profileToSwap: Profile[];
  matches: Profile[];
  fetching: boolean;
  profilesBeingFetch: number;
  currentProfile: Profile | null;
}

export type ProfileAction =
  | {
      type: "ENQUEUE_PROFILE";
      payload: { profile: Profile };
    }
  | {
      type: "SET_MATCHES";
      payload: {
        matches: Profile[];
      };
    }
  | { type: "ADD_MATCH"; payload: { match: Profile } }
  | { type: "CLEAR_SWIPE_PROFILES" }
  | { type: "SET_FETCH"; payload: { fetch: boolean } }
  | { type: "DEQUEUE_PROFILE" }
  | { type: "FETCHING_PROFILE" }
  | { type: "SET_CURRENT_PROFILE"; payload: { match: Profile } };
