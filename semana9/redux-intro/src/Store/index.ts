import { formReducer, FormAction } from "./FormReducer";
import { todoReducer, TodoAction } from "./TodoReducer";
import { combineReducers, createStore } from "redux";

export const store = createStore<string, FormAction, null, null>(formReducer);
