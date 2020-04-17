import api from "../../services/api";
import { ThunkAction } from "redux-thunk";
import { ProfileAction, Profile } from "./types";
import { RootState } from "..";

const setProfile = (profile: Profile | null): ProfileAction => ({
  type: "SET_PROFILE",
  payload: {
    profile,
  },
});

const setMatches = (matches: Profile[]): ProfileAction => ({
  type: "SET_MATCHES",
  payload: {
    matches,
  },
});

const addMatch = (match: Profile): ProfileAction => ({
  type: "ADD_MATCH",
  payload: {
    match,
  },
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ProfileAction
>;

export const clearSwipes = (): AppThunk => async (dispatch, getstate) => {
  try {
    await api.put("clear");
    const response = await api.get("person");
    dispatch(setProfile(response.data.profile));
    dispatch(setMatches([]));
  } catch (err) {
    alert("clearSwipes " + err);
  }
};

export const choosePerson = (id: string, choice: boolean): AppThunk => async (
  dispatch,
  getstate
) => {
  try {
    const profile = getstate().profiles.currentProfile;
    if (profile === null) return;
    const response = await api.post("choose-person", {
      id,
      choice,
    });
    if (response.data.isMatch) dispatch(addMatch(profile));
    const response2 = await api.get("person");
    dispatch(setProfile(response2.data.profile));
  } catch (err) {
    alert("getProfile " + err);
  }
};

export const firstLoad = (): AppThunk => async (dispatch, getstate) => {
  try {
    const response = await Promise.all([api.get("matches"), api.get("person")]);
    dispatch(setMatches(response[0].data.matches));
    dispatch(setProfile(response[1].data.profile));
  } catch (err) {
    alert("getProfile " + err);
  }
};
