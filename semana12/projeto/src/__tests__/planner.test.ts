import plannerReducer, { initialState } from "../reducers/planner";
import { PlannerActions } from "../reducers/planner/types";
import {
  addTask,
  fetchTasksEnded,
  fetchTasksRequested,
} from "../reducers/planner/actions";
import Task from "../models/Task";

describe("Planner Reducer Tests", () => {
  it("FETCH_TASKS_REQUESTED Should set fetching to true", () => {
    const action: PlannerActions = {
      type: "FETCH_TASKS_REQUESTED",
    };

    const newState = plannerReducer(undefined, action);

    expect(newState.fetchingTasks).toBe(true);
  });

  it("FETCH_TASKS_ENDED Should add tasks to state and set fetching to false", () => {
    const tasksToBeAdded = [
      {
        day: "Sunday",
        id: "blablabla",
        text: "comprar bananinha",
      },
      {
        day: "Friday",
        id: "blablabla",
        text: "comprar bananinha",
      },
      {
        day: "Sunday",
        id: "blablabla",
        text: "comprar bananinha",
      },
    ];

    const action: PlannerActions = {
      type: "FETCH_TASKS_ENDED",
      payload: {
        tasks: tasksToBeAdded,
      },
    };

    const newState = plannerReducer(initialState, action);

    tasksToBeAdded.forEach((task) => {
      expect(newState.tasks[task.day]).toContainEqual(task);
    });
    expect(newState.fetchingTasks).toBe(false);
  });
  it("ADD_TASK Should add a single task to State", () => {
    const task = {
      day: "Sunday",
      id: "blablabla",
      text: "comprar bananinha",
    };

    const action: PlannerActions = {
      type: "ADD_TASK",
      payload: {
        task,
      },
    };

    const newState = plannerReducer(initialState, action);

    expect(newState.tasks[task.day]).toContainEqual(task);
  });
  it("Should not change state without a valid action", () => {
    const action = {
      type: "INVALID_STATE",
    };

    const newState = plannerReducer(initialState, action as PlannerActions);

    expect(newState).toMatchObject(initialState);
  });
});

describe("Plane Action Tests", () => {
  it("addTask should return the correct action", () => {
    const task: Task = {
      day: "Sunday",
      id: "blablabla",
      text: "comprar bananinha",
    };

    const action = addTask(task);

    expect(action).toMatchObject({
      type: "ADD_TASK",
      payload: {
        task,
      },
    });
  });

  it("fetchTasksEnded should return the correct action", () => {
    const tasksToBeAdded = [
      {
        day: "Sunday",
        id: "blablabla",
        text: "comprar bananinha",
      },
      {
        day: "Friday",
        id: "blablabla",
        text: "comprar bananinha",
      },
      {
        day: "Sunday",
        id: "blablabla",
        text: "comprar bananinha",
      },
    ];

    const action = fetchTasksEnded(tasksToBeAdded);

    expect(action).toMatchObject({
      type: "FETCH_TASKS_ENDED",
      payload: {
        tasks: tasksToBeAdded,
      },
    });
  });

  it("fetchTasksRequested should return the correct action", () => {
    expect(fetchTasksRequested()).toMatchObject({
      type: "FETCH_TASKS_REQUESTED",
    });
  });
});
