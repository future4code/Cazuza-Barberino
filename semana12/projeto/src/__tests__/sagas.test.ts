import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { fetchTasksEnded } from "../reducers/planner/actions";
import { addTask, fetchTasks, plannerWatchers } from "../sagas/plannerSagas";
import { createTask, getTasks } from "../services/api";

describe("Testing fetchTasks generator", () => {
  const fetchTasksGen = fetchTasks();

  it("Should call getTasks", () => {
    expect(fetchTasksGen.next().value).toEqual(call(getTasks));
  });

  it("Should dispatch action to change tasks", () => {
    expect(fetchTasksGen.next([]).value).toEqual(put(fetchTasksEnded([])));
  });

  it("Should be done", () => {
    expect(fetchTasksGen.next().done).toEqual(true);
  });
});

describe("Testing addTask generator", () => {
  const day = "";
  const text = "";

  const addTaskGen = addTask({
    payload: { task: { day, text, id: "" } },
    type: "ADD_TASK",
  });

  it("Shoul call createTask", () => {
    expect(addTaskGen.next().value).toEqual(
      call(createTask, {
        day,
        text,
      })
    );
  });

  it("Should be done", () => {
    expect(addTaskGen.next().done).toEqual(true);
  });
});

describe("Testing watchers", () => {
  it("Should take latest FETCH_TASKS_REQUESTED and be done ", () => {
    const gen = plannerWatchers.watchFetchTasks();

    expect(gen.next().value).toEqual(
      takeLatest("FETCH_TASKS_REQUESTED", fetchTasks)
    );

    expect(gen.next().done).toEqual(true);
  });

  it("Should take every ADD_TASK and be done ", () => {
    const gen = plannerWatchers.watchAddTask();

    expect(gen.next().value).toEqual(takeEvery("ADD_TASK", addTask));

    expect(gen.next().done).toEqual(true);
  });
});
