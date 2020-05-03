import axios from "axios";

const api = axios.create({
  baseURL:
    "https://us-central1-missao-newton.cloudfunctions.net/astroMatch/cazuza/",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
