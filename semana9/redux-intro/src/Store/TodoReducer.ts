import { Reducer } from "redux";
import shortid from "shortid";

export interface TodoData {
  name?: string;
  id: string;
  done?: boolean;
}

export interface TodoPanel {
  todoList: TodoData[];
  name: string;
  id: string;
}

export interface TodoState {
  panels: TodoPanel[];
  filter: string;
  currentPanel: string;
}

const initalState: TodoState = {
  panels: [{ name: "New Panel", id: "primary", todoList: [] }],
  filter: "all",
  currentPanel: "primary",
};

type TodoAction =
  | { type: "ADD_TODO"; todo: TodoData }
  | { type: "TOGGLE_TODO"; todoId: string }
  | { type: "DELETE_TODO"; todoId: string }
  | { type: "COMPLETE_ALL" }
  | { type: "REMOVE_COMPLETED" }
  | { type: "CHANGE_FILTER"; filter: string }
  | { type: "NEW_PANEL" }
  | { type: "CHANGE_TAB"; panelId: string }
  | { type: "RENAME_PANEL"; name: string };

export const todoReducer: Reducer<TodoState, TodoAction> = (
  state: TodoState = initalState,
  action
) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        panels: state.panels.map((panel) =>
          panel.id !== state.currentPanel
            ? panel
            : {
                ...panel,
                todoList: [...panel.todoList, action.todo],
              }
        ),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        panels: state.panels.map((panel) =>
          panel.id !== state.currentPanel
            ? panel
            : {
                ...panel,
                todoList: panel.todoList.map((todo) =>
                  todo.id !== action.todoId
                    ? todo
                    : { ...todo, done: !todo.done }
                ),
              }
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        panels: state.panels.map((panel) =>
          panel.id !== state.currentPanel
            ? panel
            : {
                ...panel,
                todoList: panel.todoList.filter(
                  (todo) => todo.id !== action.todoId
                ),
              }
        ),
      };
    case "COMPLETE_ALL":
      return {
        ...state,
        panels: state.panels.map((panel) =>
          panel.id !== state.currentPanel
            ? panel
            : {
                ...panel,
                todoList: panel.todoList.map((todo) => ({
                  ...todo,
                  done: !todo.done,
                })),
              }
        ),
      };
    case "REMOVE_COMPLETED":
      return {
        ...state,
        panels: state.panels.map((panel) =>
          panel.id !== state.currentPanel
            ? panel
            : {
                ...panel,
                todoList: panel.todoList.filter((todo) => !todo.done),
              }
        ),
      };
    case "CHANGE_FILTER":
      return {
        ...state,
        filter: action.filter,
      };
    case "NEW_PANEL":
      const id = shortid.generate();
      return {
        ...state,
        panels: [...state.panels, { name: "New Panel", todoList: [], id }],
        currentPanel: id,
      };
    case "CHANGE_TAB":
      return {
        ...state,
        currentPanel: action.panelId,
      };
    case "RENAME_PANEL":
      return {
        ...state,
        panels: state.panels.map((panel) =>
          panel.id !== state.currentPanel
            ? panel
            : {
                ...panel,
                name: action.name,
              }
        ),
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

export const toggleTodo = (todoId: string): TodoAction => ({
  type: "TOGGLE_TODO",
  todoId,
});

export const deleteTodo = (todoId: string): TodoAction => ({
  type: "DELETE_TODO",
  todoId,
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

export const newPanel = (): TodoAction => ({
  type: "NEW_PANEL",
});

export const changeTab = (panelId: string): TodoAction => ({
  type: "CHANGE_TAB",
  panelId,
});

export const changeName = (name: string): TodoAction => ({
  type: "RENAME_PANEL",
  name,
});
