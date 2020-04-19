import api from "../../services/api";
import { ThunkAction } from "redux-thunk";
import { ProfileAction, Profile } from "./types";
import { RootState } from "..";

const fetchingProfile = (): ProfileAction => ({
  type: "FETCHING_PROFILE",
});

const setFetch = (fetch: boolean): ProfileAction => ({
  type: "SET_FETCH",
  payload: {
    fetch,
  },
});

export const dequeueProfile = (): ProfileAction => ({
  type: "DEQUEUE_PROFILE",
});

const clearProfiles = (): ProfileAction => ({
  type: "CLEAR_SWIPE_PROFILES",
});

const setProfile = (profile: Profile): ProfileAction => ({
  type: "ENQUEUE_PROFILE",
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
    dispatch(setFetch(true));
    dispatch(clearProfiles());
    dispatch(setMatches([]));
    await api.put("clear");
    for (let i = 0; i < 3; i++) {
      const resp = await api.get("person");
      if (resp.data.profile === null) break;
      await api.post("choose-person", {
        id: resp.data.profile.id,
        choice: false,
      });
      dispatch(setProfile(resp.data.profile));
    }
    dispatch(setFetch(false));
  } catch (err) {
    alert("clearSwipes " + err);
  }
};

export const choosePerson = (id: string, choice: boolean): AppThunk => async (
  dispatch,
  getstate
) => {
  try {
    // dispatch(setFetch(true));
    const profile = getstate().profiles.profileToSwap[0];
    const responseChoose = await api.post("choose-person", {
      id,
      choice,
    });
    if (responseChoose.data.isMatch) dispatch(addMatch(profile));
    // dispatch(setFetch(false));
  } catch (err) {
    alert("getProfile " + err);
  }
};

export const fetchPerson = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchingProfile());
    const responseProfile = await api.get("person");
    if (responseProfile.data.profile)
      await api.post("choose-person", {
        id: responseProfile.data.profile.id,
        choice: false,
      });
    dispatch(setProfile(responseProfile.data.profile));
  } catch (err) {
    alert("fetchPerson " + err);
  }
};

export const firstLoad = (): AppThunk => async (dispatch, getstate) => {
  try {
    dispatch(setFetch(true));
    const response = await api.get("matches");
    dispatch(setMatches(response.data.matches));

    for (let i = 0; i < 3; i++) {
      const resp = await api.get("person");
      if (resp.data.profile === null) break;
      await api.post("choose-person", {
        id: resp.data.profile.id,
        choice: false,
      });
      dispatch(setProfile(resp.data.profile));
    }
    dispatch(setFetch(false));
  } catch (err) {
    alert("getProfile " + err);
  }
};
