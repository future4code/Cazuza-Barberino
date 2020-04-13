import { formReducer } from "./FormReducer";
import { todoReducer, TodoData } from "./TodoReducer";
import { combineReducers, createStore } from "redux";

export interface StateData {
  form: string;
  todo: TodoData[];
}

export const reducers = combineReducers<StateData>({
  form: formReducer,
  todo: todoReducer,
});

export const store = createStore(reducers);
