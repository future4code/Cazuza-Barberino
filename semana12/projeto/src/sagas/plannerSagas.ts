import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { getTasks, createTask } from "../services/api";
import { fetchTasksEnded } from "../reducers/planner/actions";
import { PlannerActions } from "../reducers/planner/types";
import Task from "../models/Task";

export function* watchFetchTasks() {
  yield takeLatest("FETCH_TASKS_REQUESTED", fetchTasks);
}

export function* watchAddTask() {
  yield takeEvery("ADD_TASK", addTask);
}

function* fetchTasks() {
  const tasks = yield call(getTasks);
  yield put(fetchTasksEnded(tasks));
}

function* addTask({
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

  yield call(() =>
    createTask({
      day,
      text,
    })
  );
}
