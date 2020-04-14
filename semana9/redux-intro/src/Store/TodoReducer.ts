import { Reducer } from "redux";
import shortid from "shortid";

export interface TodoData {
  name?: string;
  id: string;
  done?: boolean;
}

export interface TodoState {
  todoList: TodoData[];
  filter: string;
}

const initalState: TodoState = { todoList: [], filter: "all" };

type TodoAction =
  | { type: "ADD_TODO"; todo: TodoData }
  | { type: "TOGGLE_TODO"; id: string }
  | { type: "DELETE_TODO"; id: string }
  | { type: "COMPLETE_ALL" }
  | { type: "REMOVE_COMPLETED" }
  | { type: "CHANGE_FILTER"; filter: string };

export const todoReducer: Reducer<TodoState, TodoAction> = (
  state: TodoState = initalState,
  action
) => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todoList: [...state.todoList, action.todo] };
    case "TOGGLE_TODO":
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== action.id),
      };
    case "COMPLETE_ALL":
      return {
        ...state,
        todoList: state.todoList.map((todo) => ({ ...todo, done: true })),
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
    default:
      return state;
  }
};

export const addTodo = (todoName: string): TodoAction => ({
  type: "ADD_TODO",
  todo: {
    name: todoName,
    done: false,
    id: shortid.generate(),
  },
});

export const toggleTodo = (id: string): TodoAction => ({
  type: "TOGGLE_TODO",
  id,
});

export const deleteTodo = (id: string): TodoAction => ({
  type: "DELETE_TODO",
  id,
});

export const completeAllTodo = (): TodoAction => ({
  type: "COMPLETE_ALL",
});

export const deleteCompletedTodo = (): TodoAction => ({
  type: "REMOVE_COMPLETED",
});

export const changeFilter = (filter: string): TodoAction => ({
  type: "CHANGE_FILTER",
  filter,
});
