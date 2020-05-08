import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { getTasks, createTask } from "../services/api";
import { fetchTasksEnded } from "../reducers/planner/actions";
import { PlannerActions } from "../reducers/planner/types";
import Task from "../models/Task";

export const plannerWatchers = {
  watchFetchTasks: function* () {
    yield takeLatest("FETCH_TASKS_REQUESTED", fetchTasks);
  },
  watchAddTask: function* () {
    yield takeEvery("ADD_TASK", addTask);
  },
};

export function* fetchTasks() {
  const tasks = yield call(getTasks);
  yield put(fetchTasksEnded(tasks));
}

export function* addTask({
  payload,
}: Extract<
  {
    type: "ADD_TASK";
    payload: {
      task: Task;
    };
  },
  PlannerActions
>) {
  const { day, text } = payload.task;

  yield call(createTask, {
    day,
    text,
  });
}
