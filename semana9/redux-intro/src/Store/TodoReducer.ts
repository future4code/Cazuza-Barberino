import { Action, Reducer } from "redux";
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

interface TodoAction extends Action<ActionType> {
  payload: {
    todo: TodoData;
    filter: string;
  };
}

const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const COMPLETE_ALL = "COMPLETE_ALL";
const REMOVE_COMPLETED = "REMOVE_COMPLETED";
const CHANGE_FILTER = "CHANGE_FILTER";

type ActionType =
  | typeof ADD_TODO
  | typeof TOGGLE_TODO
  | typeof DELETE_TODO
  | typeof COMPLETE_ALL
  | typeof REMOVE_COMPLETED
  | typeof CHANGE_FILTER;

export const todoReducer: Reducer<TodoState, TodoAction> = (
  state: TodoState = initalState,
  action
) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todoList: [...state.todoList, action.payload.todo] };
    case TOGGLE_TODO:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.todo.id
            ? { ...todo, done: !todo.done }
            : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter(
          (todo) => todo.id !== action.payload.todo.id
        ),
      };
    case COMPLETE_ALL:
      return {
        ...state,
        todoList: state.todoList.map((todo) => ({ ...todo, done: true })),
      };
    case REMOVE_COMPLETED:
      return {
        ...state,
        todoList: state.todoList.filter((todo) => !todo.done),
      };
    case CHANGE_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
      };
    default:
      return state;
  }
};

export const addTodo = (todoName: string): TodoAction => ({
  type: ADD_TODO,
  payload: {
    todo: {
      name: todoName,
      done: false,
      id: shortid.generate(),
    },
    filter: "",
  },
});

export const toggleTodo = (id: string): TodoAction => ({
  type: TOGGLE_TODO,
  payload: {
    todo: {
      id,
    },
    filter: "",
  },
});

export const deleteTodo = (id: string): TodoAction => ({
  type: DELETE_TODO,
  payload: {
    todo: {
      id,
    },
    filter: "",
  },
});

export const completeAllTodo = (): TodoAction => ({
  type: COMPLETE_ALL,
  payload: {
    todo: {
      id: "",
    },
    filter: "",
  },
});

export const deleteCompletedTodo = (): TodoAction => ({
  type: REMOVE_COMPLETED,
  payload: {
    todo: {
      id: "",
    },
    filter: "",
  },
});

export const changeFilter = (filter: string): TodoAction => ({
  type: CHANGE_FILTER,
  payload: {
    todo: {
      id: "",
    },
    filter,
  },
});
