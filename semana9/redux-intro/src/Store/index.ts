import { todoReducer, TodoState } from "./TodoReducer";
import { combineReducers, createStore } from "redux";

export interface StateData {
  todo: TodoState;
}

const reducers = combineReducers<StateData>({
  todo: todoReducer,
});

export const store = createStore(reducers);
