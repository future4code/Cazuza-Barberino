import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { getTasks, createTask } from "../services/api";
import { fetchTasksEnded } from "../reducers/planner/actions";
import { PlannerActions } from "../reducers/planner/types";
import Task from "../models/Task";

export function* watchFetchTasks() {
  yield takeLatest("FETCH_TASKS_REQUESTED", fetchTasks);
}

export function* watchAddTask() {
  yield takeLatest("ADD_TASK", addTask);
}

export function* fetchTasks() {
  const tasks = yield call(getTasks);
  yield put(fetchTasksEnded(tasks));
}

export function* addTask(
  action: Extract<
    {
      type: "ADD_TASK";
      payload: {
        task: Task;
      };
    },
    PlannerActions
  >
) {
  console.log(action);

  const { day, text } = action.payload.task;

  yield call(createTask, {
    day,
    text,
  });
}
