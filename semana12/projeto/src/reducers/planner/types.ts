import Task from "../../models/Task";

export interface PlannerState {
  fetchingTasks: boolean;
  tasks: {
    [key: string]: Task[];
  };
}

export type PlannerActions =
  | {
      type: "FETCH_TASKS_REQUESTED";
    }
  | {
      type: "FETCH_TASKS_ENDED";
      payload: {
        tasks: Task[];
      };
    }
  | {
      type: "ADD_TASK";
      payload: {
        task: Task;
      };
    };
