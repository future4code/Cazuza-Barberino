export interface Profile {
  id: string;
  age: number;
  name: string;
  photo: string;
  bio: string;
}

export interface ProfilesState {
  currentProfile: Profile | null;
  matches: Profile[];
}

export type ProfileAction =
  | {
      type: "SET_PROFILE";
      payload: { profile: Profile | null };
    }
  | {
      type: "SET_MATCHES";
      payload: {
        matches: Profile[];
      };
    }
  | { type: "ADD_MATCH"; payload: { match: Profile } };
