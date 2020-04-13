import { Action, Reducer, Dispatch } from "redux";
import shortid from "shortid";

export interface TodoData {
  name?: string;
  id?: string;
  done?: boolean;
}

const initalState: TodoData[] = [];

export interface TodoAction extends Action<ActionType> {
  payload: TodoData;
}

export enum ActionType {
  AddTodo,
  ToggleTodo,
  DeleteTodo,
}

export const todoReducer: Reducer<TodoData[], TodoAction> = (
  state: TodoData[] = initalState,
  action
) => {
  switch (action.type) {
    case ActionType.AddTodo:
      return [...state, action.payload];
    case ActionType.ToggleTodo:
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, done: !todo.done } : todo
      );
    case ActionType.DeleteTodo:
      return state.filter((todo) => todo.id !== action.payload.id);
    default:
      return state;
  }
};

export class TodoDispatcher {
  constructor(dispatch: Dispatch<TodoAction>) {
    this.dispatch = dispatch;
  }

  private readonly dispatch: Dispatch<TodoAction>;

  addTodo = (todoName: string) =>
    this.dispatch({
      type: ActionType.AddTodo,
      payload: {
        name: todoName,
        done: false,
        id: shortid.generate(),
      },
    });

  toggleTodo = (id: string) =>
    this.dispatch({
      type: ActionType.ToggleTodo,
      payload: {
        id,
      },
    });

  deleteTodo = (id: string) =>
    this.dispatch({
      type: ActionType.DeleteTodo,
      payload: {
        id,
      },
    });
}
