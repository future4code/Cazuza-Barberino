import { todoReducer, TodoState } from "./TodoReducer";
import { todoListReducer, TodoListState } from "./todoListReducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

export interface StateData {
  todo: TodoState;
  lists: TodoListState;
}

const reducers = combineReducers<StateData>({
  todo: todoReducer,
  lists: todoListReducer,
});

export const store = createStore(reducers, applyMiddleware(ReduxThunk));
