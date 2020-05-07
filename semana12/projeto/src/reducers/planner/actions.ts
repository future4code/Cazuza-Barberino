import { PlannerActions } from "./types";
import Task from "../../models/Task";

export const fetchTasksRequested = (): PlannerActions => ({
  type: "FETCH_TASKS_REQUESTED",
});

export const fetchTasksEnded = (tasks: Task[]): PlannerActions => ({
  type: "FETCH_TASKS_ENDED",
  payload: {
    tasks,
  },
});

export const addTask = (task: Task): PlannerActions => ({
  type: "ADD_TASK",
  payload: {
    task,
  },
});
