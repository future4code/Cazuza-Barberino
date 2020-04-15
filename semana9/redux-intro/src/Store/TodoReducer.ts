import { Reducer } from "redux";
import { ThunkAction } from "redux-thunk";
import { StateData } from "../Store";
import { Action } from "redux";
import api from "../services/api";

export interface TodoData {
  text: string;
  id: string;
  done?: boolean;
}

export interface TodoState {
  todoList: TodoData[];
  filter: string;
  search: string;
}

const initalState: TodoState = {
  todoList: [],
  filter: "all",
  search: "",
};

type TodoAction =
  | { type: "ADD_TODO"; todo: TodoData }
  | { type: "TOGGLE_TODO"; todoId: string }
  | { type: "DELETE_TODO"; todoId: string }
  | { type: "COMPLETE_ALL" }
  | { type: "REMOVE_COMPLETED" }
  | { type: "CHANGE_FILTER"; filter: string }
  | { type: "SEARCH_TODO"; search: string }
  | { type: "LOAD_TODOS"; todos: TodoData[] };

export const todoReducer: Reducer<TodoState, TodoAction> = (
  state: TodoState = initalState,
  action
) => {
  switch (action.type) {
    case "LOAD_TODOS":
      return {
        ...state,
        todoList: action.todos,
      };
    case "ADD_TODO":
      return {
        ...state,
        todoList: [...state.todoList, action.todo],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id !== action.todoId ? todo : { ...todo, done: !todo.done }
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== action.todoId),
      };
    case "COMPLETE_ALL":
      return {
        ...state,
        todoList: state.todoList.map((todo) => ({
          ...todo,
          done: !todo.done,
        })),
      };
    case "REMOVE_COMPLETED":
      return {
        ...state,
        todoList: state.todoList.filter((todo) => !todo.done),
      };
    case "CHANGE_FILTER":
      return {
        ...state,
        filter: action.filter,
      };
    case "SEARCH_TODO":
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
};

export const changeFilter = (filter: string): TodoAction => ({
  type: "CHANGE_FILTER",
  filter,
});

export const searchTodo = (search: string): TodoAction => ({
  type: "SEARCH_TODO",
  search,
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StateData,
  unknown,
  Action<string>
>;

export const fetchTodos = (): AppThunk => async (dispatch, getstate) => {
  try {
    const id = getstate().lists.currentlist;
    const response = await api.get(`cazuza-${id}/todos`);
    dispatch<TodoAction>({ type: "LOAD_TODOS", todos: response.data.todos });
  } catch (err) {
    alert("FetchTodos " + err);
  }
};

export const createTodo = (todoName: string): AppThunk => async (
  dispatch,
  getstate
) => {
  try {
    const id = getstate().lists.currentlist;
    const response = await api.post(`cazuza-${id}/todos`, {
      text: todoName,
    });
    dispatch<TodoAction>({ type: "ADD_TODO", todo: response.data.todo });
  } catch (err) {
    alert("CreateTodos " + err);
  }
};

export const toggleTodo = (todoId: string): AppThunk => async (
  dispatch,
  getstate
) => {
  try {
    const id = getstate().lists.currentlist;
    const response = await api.put(`cazuza-${id}/todos/${todoId}/toggle`);
    dispatch<TodoAction>({
      type: "TOGGLE_TODO",
      todoId,
    });
  } catch (err) {
    alert("FetchTodos " + err);
  }
};

export const deleteTodo = (todoId: string): AppThunk => async (
  dispatch,
  getstate
) => {
  try {
    const id = getstate().lists.currentlist;
    const response = await api.delete(`cazuza-${id}/todos/${todoId}`);
    dispatch<TodoAction>({
      type: "DELETE_TODO",
      todoId,
    });
  } catch (err) {
    alert("FetchTodos " + err);
  }
};

export const completeAllTodo = (): AppThunk => async (dispatch, getstate) => {
  try {
    const id = getstate().lists.currentlist;
    const todoIdList = getstate()
      .todo.todoList.filter((todo) => !todo.done)
      .map((todo) => todo.id);

    await Promise.all(
      todoIdList.map((todoId) => api.put(`cazuza-${id}/todos/${todoId}/toggle`))
    );

    dispatch<TodoAction>({
      type: "COMPLETE_ALL",
    });
  } catch (err) {
    alert("FetchTodos " + err);
  }
};

export const deleteCompletedTodo = (): AppThunk => async (
  dispatch,
  getstate
) => {
  try {
    const id = getstate().lists.currentlist;
    const response = await api.delete(`cazuza-${id}/todos/delete-done`);
    dispatch<TodoAction>({ type: "REMOVE_COMPLETED" });
  } catch (err) {
    alert("FetchTodos " + err);
  }
};
