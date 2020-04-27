import axios from "axios";

const api = axios.create({
  baseURL:
    "https://us-central1-missao-newton.cloudfunctions.net/futureX/cazuza/",
});

export const fetchTrips = async () => {
  try {
    return await api.get("trips");
  } catch (err) {
    return err;
  }
};

export const tryLogin = async (
  email: string,
  password: string,
  callback?: (success: boolean, token: string) => void
) => {
  try {
    const body = {
      email,
      password,
    };
    const response = await api.post("login", body);
    if (callback) callback(true, response.data.token);
  } catch (err) {
    if (callback) callback(false, "");
  }
};

export const getTripDetails = async (
  token: string,
  id: string,
  callback: (candidates: any[], approved: any[]) => void
) => {
  try {
    const response = await api.get(`trip/${id}`, {
      headers: { auth: token },
    });
    callback(response.data.trip.candidates, response.data.trip.approved);
  } catch (err) {
    callback([], []);
  }
};

export const applyToTrip = async (
  id: string,
  [name, age, applicationText, profession, country]: string[],
  callback: (success: boolean) => void
) => {
  try {
    const body = {
      name,
      age,
      applicationText,
      profession,
      country,
    };
    const response = await api.post(`trips/${id}/apply`, body);
    callback(true);
  } catch (err) {
    callback(true);
  }
};

export const decideCandidate = async (
  tripId: string,
  candidateId: string,
  approve: boolean,
  callback: () => void
) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const body = {
        approve,
      };
      await api.put(`trips/${tripId}/candidates/${candidateId}/decide`, body, {
        headers: { auth: token },
      });
    } catch (err) {}
  }
  callback();
};

export default api;
