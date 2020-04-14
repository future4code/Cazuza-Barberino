import { formReducer } from "./FormReducer";
import { todoReducer, TodoState } from "./TodoReducer";
import { combineReducers, createStore } from "redux";

export interface StateData {
  form: string;
  todo: TodoState;
}

const reducers = combineReducers<StateData>({
  form: formReducer,
  todo: todoReducer,
});

export const store = createStore(reducers);
