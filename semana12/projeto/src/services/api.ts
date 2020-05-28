import axios from "axios";
import Task from "../models/Task";

const api = axios.create({
  baseURL:
    "https://us-central1-missao-newton.cloudfunctions.net/generic/cazuza",
});

export default api;

export const getTasks = async (): Promise<Task[]> => {
  try {
    return (await api.get("/")).data;
  } catch (error) {
    alert("getTask " + error);
    return [];
  }
};

export const createTask = async ({
  text,
  day,
}: Omit<Task, "id">): Promise<Task> => {
  try {
    return (await api.post("/", { text, day })).data;
  } catch (error) {
    alert("createTask " + error);
    return { id: "error", text, day };
  }
};
