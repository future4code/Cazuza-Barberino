import { PlannerState, PlannerActions } from "./types";
import weekdays from "../../data/weekdays";

const initialState: PlannerState = {
  fetchingTasks: false,
  tasks: weekdays.reduce(
    (previousValue, day) => ({
      ...previousValue,
      [day]: [],
    }),
    {}
  ),
};

const plannerReducer = (
  state: PlannerState = initialState,
  action: PlannerActions
): PlannerState => {
  switch (action.type) {
    case "FETCH_TASKS_REQUESTED":
      return {
        ...state,
        fetchingTasks: true,
      };
    case "FETCH_TASKS_ENDED":
      return {
        ...state,
        fetchingTasks: false,
        tasks: action.payload.tasks.reduce(
          (previousValue, task) => ({
            ...previousValue,
            [task.day]: [...previousValue[task.day], task],
          }),
          state.tasks
        ),
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.task.day]: [
            ...state.tasks[action.payload.task.day],
            action.payload.task,
          ],
        },
      };
    default:
      return state;
  }
};

export default plannerReducer;
